const path = require("path");
const chai = require("chai");
const sinon = require("sinon");

chai.use(require("sinon-chai"));

const expect = chai.expect;
const pathToCLI = path.resolve(__dirname, "..", "bin", "index.js");

global.sinon = sinon;
global.expect = expect;
global.process = process;
global.pathToCLI = pathToCLI;
