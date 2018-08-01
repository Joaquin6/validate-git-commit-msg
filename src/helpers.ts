import * as fs from "fs";
import * as path from "path";
import * as chalk from "chalk";

import { LogLevels, Severity } from "./interfaces";

const { existsSync, lstatSync, readFileSync } = fs;

const LOG_LEVELS: LogLevels = {
  debug: {
    color: "white"
  },
  error: {
    color: "red"
  },
  info: {
    color: "cyan"
  },
  warn: {
    color: "yellow"
  }
};

function splitPath(partsPath: string): string[] {
  const parts = partsPath.split(/(\/|\\)/);
  if (!parts.length) {
    return parts;
  }
  /** when partsPath starts with a slash, the first part is empty string */
  return !parts[0].length ? parts.slice(1) : parts;
}

export function log(message: string, severity: Severity = "info"): void {
  const color: string = LOG_LEVELS[severity].color || "cyan";

  if (process.env.SILENT !== "true") {
    console.log((chalk as any)[color](message));
  }
}

export function findParentDir(currentFullPath: string, clue: string): string[] {

  function testDir(parts: string[]): any {
    if (parts.length === 0) {
      return null;
    }
    const p = parts.join("");
    const itdoes = existsSync(path.join(p, clue));
    return itdoes ? p : testDir(parts.slice(0, -1));
  }

  return testDir(splitPath(currentFullPath));
}

export function getGitFolder() {
  const dir: any = findParentDir(process.cwd(), ".git");
  if (!dir) {
    throw new Error("Cannot find .git folder");
  }
  let gitDir: string = path.join(dir, ".git");
  const stats: fs.Stats = lstatSync(gitDir);

  if (!stats.isDirectory()) {
      const pathToGit: string = readFileSync(gitDir, "utf-8").split(":")[1].trim();
      gitDir = path.join(dir, pathToGit);
      if (!existsSync(gitDir)) {
        throw new Error(`Cannot find file ${pathToGit}`);
     }
  }

  return gitDir;
}
