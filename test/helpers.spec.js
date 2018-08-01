import path from "path";

import { helpers } from "../dist";

describe("helpers", () => {
  describe("findParentDir", () => {
    let findParentDir;

    before(() => {
      findParentDir = helpers.findParentDir;
    });

    it("finding .git root relative to the test dir", () => {
      findParentDir(__dirname, '.git', (err, dir) => {
        expect(dir).to.equal(path.resolve(__dirname, '..') + '/');
      });
    });

    it("finding this dir relative to the test dir", () => {
      findParentDir(__dirname, 'find-parent-dir.js', function (err, dir) {
        expect(dir).to.equal(path.resolve(__dirname));
      });
    });
  });
});
