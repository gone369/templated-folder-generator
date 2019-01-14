const { getTemplateNamesFromRootPaths } = require('./helper.js');

function templateAction(program){
  return function(){
    getTemplateNamesFromRootPaths(program).forEach((templates, i) => {
      console.log(i === 0 ? "Default Templates:" : "User Defined Templates:");
      templates.forEach(t => console.log(t));
      console.log(" ");
    });
    process.exit(0);
  }
}

module.exports = templateAction;
