const Path = require('path');
const fs = require("fs");
const hbs = require("handlebars");

const { last,getTemplateNamesFromRootPaths,getTemplateDirs } = require('./helper.js');

function generateAction(program) {
  return function(template = "default", dest = ".", options){
    const targetPath = Path.resolve(process.cwd(), dest);
    const targetDir = options.name || Path.dirname(targetPath);

    const templateCategories = getTemplateNamesFromRootPaths(program);
    const templates = templateCategories[0].concat(templateCategories[1]||[]);
    const targetTemplate = template;
    let targetTemplateCategory = null;
    templateCategories.forEach((templateCategory,i)=>{
      if(templateCategory.includes(targetTemplate)){
        targetTemplateCategory = i;
      }
    })
    if (targetTemplateCategory === null) {
      console.error(
        "template does not exist. run the 'templates' command to see all availble templates"
      );
      process.exit(1);
    }
    const targetTemplateDir = Path.resolve(getTemplateDirs(program)[targetTemplateCategory],targetTemplate);
    console.log(`generating templates from ${targetTemplateDir}...`);

    //get all files in template dir

    fs.readdirSync(targetTemplateDir).forEach(fileName=>{
      const targetFilePath = Path.resolve(targetTemplateDir,fileName);
      const file = fs.readFileSync(targetFilePath,{encoding:'utf8'})
      const hbsTemplate = hbs.compile(file);

      //get cwd folder name
      let componentName = typeof program.name === 'string'? program.name : last(process.cwd().split('/'));

      const hypenName = componentName.replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase() });
      lowerCasedHypenName = hypenName[0].toLowerCase() + hypenName.slice(1);
      const snakeCaseName = componentName.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

      const capitalizedSnakeCaseName = snakeCaseName[0].toUpperCase() + snakeCaseName.slice(1);

      let userContext = {};
      try{
        userContext = JSON.parse(program.context);
      } catch(e){
        console.log('invalid JSON string provided to custom context. ( -c <invalid context> ).');
        console.log('generate failed.');
        process.exit(1);
      }

      const context = {
        ...userContext,
        component: {
          name: {
            original: componentName,
            hypen: lowerCasedHypenName,
            snakeCase: snakeCaseName,
            capitalizedSnakeCase: capitalizedSnakeCaseName,
          },
        },
        name: componentName
      };

      const compiledFile = hbsTemplate(context);

      const hbsFilenameTemplate = hbs.compile(fileName);
      const compiledFileName = hbsFilenameTemplate(context);
      let fileType;
      const fn = compiledFileName.split('.').reduce(function(sum,part,i,arr){
        if(i === arr.length -1){
          fileType = program.filetype || part;
          return sum;
        } else {
          return sum.concat(part);
        }
      },[]).join('.');

      const destFile = Path.resolve(process.cwd(),dest,`${program.prefix?program.prefix+'.':''}${fn}.${program.postfix?program.postfix+'.':''}${fileType}`);

      if(program.dryrun){
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log('[Dry run] will generate file to path:',destFile);
        console.log('================== SOF ==========================');
        console.log(compiledFile);
        console.log('<<<<<<<<<<<<<<<<<< EOF <<<<<<<<<<<<<<<<<<<<<<<<<<');
        console.log('');
      } else {
        console.log('generating file to path:',destFile);
        //write compiled back to dest path
        fs.writeFileSync(destFile,compiledFile);
      }


    });
    console.log('done');
    process.exit(0);
  }
}

module.exports = generateAction;
