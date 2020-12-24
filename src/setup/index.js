const { getRootPath } = require("../helper.js");

const setupConfig = require("./config.setup.js");
const setupContext = require("./context.setup.js");

module.exports = function setup(program, cb) {
  return function(...args) {
    // get rc files
    setupConfig(program);

    cb(program)(...args);
  };
};
