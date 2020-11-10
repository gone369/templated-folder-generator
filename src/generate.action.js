const Path = require("path");
const fs = require("fs");
const hbs = require("handlebars");
const initDefaultContext = require("./context");

const {
  last,
  getCwd,
  getTemplateNamesFromRootPaths,
  getTemplateDirs,
} = require("./helper.js");

function generateAction(program) {
  try {
    return function (template = "default", dest = ".", options) {
      //defaults
      program.filename = program.filename || "index";

      const targetPath = Path.resolve(getCwd(), dest);
      // const targetDir = options.name || Path.dirname(targetPath);

      const templateCategories = getTemplateNamesFromRootPaths(program);
      // const templates = templateCategories[0].concat(
      //   templateCategories[1] || []
      // );
      const targetTemplate = template;
      let targetTemplateCategory = null;
      templateCategories.forEach((templateCategory, i) => {
        if (templateCategory.includes(targetTemplate)) {
          targetTemplateCategory = i;
        }
      });
      if (targetTemplateCategory === null) {
        console.error(
          "template does not exist. Run 'tfg templates' to see all available templates"
        );
        process.exit(1);
      }
      const targetTemplateDir = Path.resolve(
        getTemplateDirs(program)[targetTemplateCategory],
        targetTemplate
      );
      console.log(`generating templates from ${targetTemplateDir}...`);

      //get all files in template dir

      fs.readdirSync(targetTemplateDir).forEach((fileName) => {
        const targetFilePath = Path.resolve(targetTemplateDir, fileName);
        const file = fs.readFileSync(targetFilePath, { encoding: "utf8" });
        const hbsTemplate = hbs.compile(file);

        //get cwd folder name
        const dirName = last(getCwd().split("/"));
        const userDefinedName = program.name;
        let componentName =
          typeof userDefinedName === "string" ? userDefinedName : dirName;

        let context = initDefaultContext({
          componentName,
          filename: program.filename,
          dirName,
        });

        if (typeof program.context !== "undefined") {
          try {
            userContextPath = Path.resolve(getCwd(), program.context);

            const contextFile = require(userContextPath);
            let contextCb = () => {};

            if (typeof contextFile.default === "function") {
              contextCb = contextFile.default;
            }
            if (typeof contextFile === "function") {
              contextCb = contextFile;
            }

            context = contextCb({
              componentName,
              filename: program.filename,
              dirName,
            });
          } catch (e) {
            console.error(e);
            console.log("generate failed.");
            process.exit(1);
          }
        }

        const compiledFile = hbsTemplate(context);

        const hbsFilenameTemplate = hbs.compile(fileName);
        const compiledFileName = hbsFilenameTemplate(context);
        let fileType;

        let fileTypeMap = null;

        if (program.filetypemap) {
          try {
            fileTypeMap = JSON.parse(program.filetypemap);
          } catch (e) {
            console.log(
              "invalid JSON string provided to filetype map. ( -f <invalid map> ). Given ",
              program.filetypemap
            );
            console.log("generate failed.");
            process.exit(1);
          }
        }

        const fn = compiledFileName
          .split(".")
          .reduce(function (sum, part, i, arr) {
            if (i === arr.length - 1) {
              fileType =
                fileTypeMap === null
                  ? part
                  : typeof fileTypeMap[part] === "undefined"
                  ? part
                  : fileTypeMap[part];
              return sum;
            } else {
              return sum.concat(part);
            }
          }, [])
          .join(".");

        const destFile = Path.resolve(
          getCwd(),
          dest,
          `${program.prefix ? program.prefix : ""}${fn}${
            program.postfix ? program.postfix : ""
          }.${fileType}`
        );

        if (program.dryrun) {
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
          console.log("[Dry run] will generate file to path:", destFile);
          console.log("================== SOF ==========================");
          console.log(compiledFile);
          console.log("<<<<<<<<<<<<<<<<<< EOF <<<<<<<<<<<<<<<<<<<<<<<<<<");
          console.log("");
        } else {
          console.log("generating file to path:", destFile);
          //write compiled back to dest path
          fs.writeFileSync(destFile, compiledFile);
        }
      });
      console.log("done");
      process.exit(0);
    };
  } catch (e) {
    console.log("an error occured while running the program:");
    console.error(e);
    process.exit(1);
  }
}

module.exports = generateAction;
