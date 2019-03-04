const Path = require('path')
const fs = require('fs')
const pkgDir = require('pkg-dir')

const rootPath = pkgDir.sync(getCwd())

function getCwd(){
  return process.env.INIT_CWD || getCwd();
}

function last(arr) {
  return arr[arr.length - 1]
}

function getTemplateDirs(program) {
  const templateDir = Path.resolve(__dirname, '../templates')
  let searchPaths = [templateDir]
  let userTemplatePath = []

  let targetPaths = [];

  if(process.env.TEMPLATE_PATH){
    targetPaths = [Path.resolve(rootPath, process.env.TEMPLATE_PATH)]
  }

  if(program.path){
    // 1. check relative path from cwd
    const relativePath = Path.resolve(getCwd(), program.path)
    //2 . check absolute path
    const absolutePath = Path.resolve(program.path)
    //3 . check relative path from appRoot
    const appRootRelativePath = Path.resolve(rootPath, program.path)
    targetPaths = [relativePath,absolutePath,appRootRelativePath]
  }

  //check if folder exists
  targetPaths.some(targetPath => {
    const found = isDirectory(targetPath)
    if (found) {
      userTemplatePath = targetPath
    }
    return found
  })

  if (userTemplatePath.length === 0 && process.env.TEMPLATE_PATH && program.path) {
    throw new Error(`searched in : ${targetPaths.join('\n')} \n but could not find the target directory`);
  } else {
    searchPaths = searchPaths.concat(userTemplatePath)
    return searchPaths
  }
}

function getTemplateNamesFromRootPaths(program) {
  return getTemplateDirs(program).map(getTemplateNamesFromPath)
}

function isDirectory(source) {
  try{
    const dirName = Path.parse(source).name
    if(dirName.charAt(0) === '.'){ // ignore hidden directories
      return false;
    }
    fs.lstatSync(source).isDirectory()
    return true;
  } catch(e){
    return false;
  }
}

function getTemplateNamesFromPath(dirPath) {
  // get all template names from folder
  return fs
  .readdirSync(dirPath)
  .map(name => Path.join(dirPath, name))
  .filter(isDirectory)
  .map(dirPath => last(dirPath.split('/')))
}

module.exports = {
  getTemplateDirs,
  getTemplateNamesFromPath,
  getTemplateNamesFromRootPaths,
  getCwd,
  last,
}

