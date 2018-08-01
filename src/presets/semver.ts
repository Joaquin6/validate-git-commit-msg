import { Preset } from "../interfaces";

import { log } from "../helpers";

export const semver: Preset = {
  validate(message: string): boolean {
    const MAX_LENGTH: number = 100;
    // const JIRA_PATTERN: RegExp = /^\[[\w-]*\]\s\w*(\s&\s\w*)?\s?:.*/;
    const PATTERN: RegExp = /^(?:fixup!\s*)?(\w*)(\(([\w\$\.\*/-]*)\))?\: (.*)$/;
    const TYPES: any = {
      build: true,
      chore: true,
      ci: true,
      docs: true,
      feat: true,
      fix: true,
      perf: true,
      refactor: true,
      revert: true,
      style: true,
      test: true
    };

    // semver only cares about the first line
    message = message.split("\n").shift();

    if (message.length >= MAX_LENGTH) {
      log(`Message is longer than ${MAX_LENGTH} characters!`, "error");

      return false;
    }

    const match: RegExpExecArray = PATTERN.exec(message);

    if (!match) {
      log(`Message does not match these rules:
        ======================================================
        template  =>    "<type>(jiraticket): commit message"
        example   =>    "feat(kc-101): commit message"
        was       =>    "${message}"
        ======================================================`,
        "error");

      log(`
        ######################################################
        ##### In your commit message, you should answer  #####
        #####  1. Which Story is this commit belong to?  #####
        #####  2. Who do this commit? (or pair)          #####
        #####  3. Why do this commit?                    #####
        ######################################################

        ******************************************************
        **************  Notes for your commit  ***************
        ***   1. Make your commit Single Responsibility.   ***
        ***   2. Make sure one sentence can describe all   ***
        ***   things you have done in this commit clearly. ***
        ******************************************************`,
        "info");

      return false;
    }

    const type: string = match[1];
    // in case they are needed
    // const scope: string = match[3];
    // const subject: string = match[4];

    if (!TYPES.hasOwnProperty(type)) {
      log(`'${type}' is not an allowed type!`, "error");
      log(`Valid types are: ${Object.keys(TYPES).join(", ")}`, "info");

      return false;
    }

    return true;
  },
  ignorePattern: /^WIP\:/
};
