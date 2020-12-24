const store = require("../store");
const { getRootPath } = require("../helper");
const fs = require("fs");
const path = require("path");
const defaultConfig = require("../defaults/config.default");

const defaultConfigKeys = Object.keys(defaultConfig);

const configFilenameLookups = ["tfg.config.js"];

function setupConfig(program) {
  const rootPath = getRootPath();
  const { templatePath, map: fileTypeMap, prefix, postfix, dryRun } = program;

  let config;
  configFilenameLookups.some(function(filename) {
    try {
      config = require(path.relative(`${rootPath}/${filename}`, __dirname));
      return true;
    } catch (e) {
      program.debug &&
        console.warn(`[setupConfig] ${rootPath}/${filename} is not found`);
      return false;
    }
  });

  // check config validity
  if (config) {
    Object.keys(config).forEach(function(configKey) {
      if (!defaultConfigKeys.includes(configKey)) {
        throw new Error(
          `${configKey} is an invalid config property. Please make sure your tfg.config.js is correct.`
        );
      }
    });
    store.merge({ config });
  }

  return store.get("context");
}

module.exports = setupConfig;
