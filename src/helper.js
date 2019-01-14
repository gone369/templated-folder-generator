const Path = require('path');
const fs = require('fs');

function last(arr){
  return arr[arr.length - 1];
}

function getTemplateDirs(program){
  const templateDir = Path.resolve(__dirname, "../templates");
  let searchPaths = [templateDir];

  if (program.path) {
    const userTemplatePath = Path.resolve(process.cwd(), program.path);
    searchPaths.push(userTemplatePath);
  }
  return searchPaths;
}

function getTemplateNamesFromRootPaths(program) {
  return getTemplateDirs(program).map(getTemplateNamesFromPath);
}

function getTemplateNamesFromPath(dirPath) {
  // get all template names from folder
  const isDirectory = source => fs.lstatSync(source).isDirectory();
  return fs
    .readdirSync(dirPath)
    .map(name => Path.join(dirPath, name))
    .filter(isDirectory)
    .map(dirPath => last(dirPath.split("/")));
}

module.exports = {
  getTemplateDirs,
  getTemplateNamesFromPath,
  getTemplateNamesFromRootPaths,
  last
};
