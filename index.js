#!/usr/bin/env node

const program = require("commander");
const packageJSON = require("./package.json");

const templatesAction = require("./src/templates.action.js");
const generateAction = require("./src/generate.action.js");

program
  .version(packageJSON.version, "-v, --version")
  .option("-p, --path <templatePath>", "custom template folder path")
  .option(
    "-N, --filename <filename>",
    "change the name of the file (default is 'index')"
  )
  .option(
    "-n, --name <name>",
    "change the name of the component (default is based on dest dir name)"
  )
  .option(
    "-c, --context <context>",
    "pass in a file path to a js file containing an export of a context builder callback"
  )
  .option(
    "-f, --filetypemap <map>",
    "give a filetype map to change the file types of templates"
  )
  .option("-x, --prefix <name>", "add prefix to component file name")
  .option("-X, --postfix <name>", "add postfix to component file name")
  .option("-d, --dryrun", "dry run")

// error on unknown commands
//

program
  .command("templates")
  .alias("t")
  .action(templatesAction(program));

program
  .command("generate [template] [dest]")
  .alias("g")
  .action(generateAction(program));

program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv);
