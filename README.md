Templated Folder Generator
==================================
[![npm](https://img.shields.io/npm/v/templated-folder-generator.svg)](https://www.npmjs.com/package/templated-folder-generator) ![license](https://img.shields.io/npm/l/templated-folder-generator.svg) ![github-issues](https://img.shields.io/github/issues/gone369/templated-folder-generator.svg) ![npm-downloads](https://img.shields.io/npm/dt/templated-folder-generator.svg)

# Installation

```bash
npm i templated-folder-generator -g
```

or locally

```bash
npm i templated-folder-generator -D
```

and use it with npm scripts

###### package.json
```json
{
  "scripts":{
    "tfg": "tfg"
  }
}
```

```bash
npm run tfg -- g default-react-class
```

or npx
```bash
npx tfg g default-react-class
```



# Quick Start
The generator comes with 2 react component templates. I will be using it for quickstart examples.

## Generating Components

```bash
cd path/to/target/folder
tfg g <templateName>
```

or

```bash
tfg g <templateName> <path/to/target/folder>
```

#### Example:

```bash
cd src/my-react-component
tfg g default-react-class
```

or

```bash
tfg g default-react-class path/to/my/new/react/component/directory
```

## Generating Components with custom name:
```bash
cd
tfg g default-react-class -n super-cool-component
```

## Generating Components with custom template folder

#### Example:
1. create a folder with the below structure within your project
#### template folder structure:
```
├── package.json
├── templates
│   ├── my-less-template
│   │   ├── {{filename}}.js
│   │   ├── {{filename}}.less
│   ├── my-scss-template
│   │   ├── {{filename}}.js
│   │   ├── {{filename}}.scss
```

2. Execute below commands to generate from your custom template
```bash
cd path/to/my/scss/folder
tfg g my-scss-template -p <absolute or relative path to /templates | relative path to /templates from project root containing package.json>
```

##### Example:
```bash
cd path/to/my/scss/folder
tfg g my-scss-template -p ./templates
```

You can also use Environment Variable `TEMPLATE_PATH` to specify default path to search for the template and can be used in your package.json

###### package.json
```json
{
  "scripts": {
    "gen": "TEMPLATE_PATH=templates tfg g"
  }
}
```
then use it like:
```bash
npm run gen -- my-scss-template
```

Please Refer to [Template Creation](#template-creation) for how to create templates

## Check Available Templates
```bash
tfg t
```
##### Checking Available Templates with your own template dir
```bash
tfg t -p path/to/my/custom/template/folder
```

## Dry Run (won't generate file)
```bash
tfg g my-template -d
```

## Custom Template Variables

please refer to [user defined context section](#user-defined-context)

## Custom File Type Mapping

please refer to [User Defined File Type Mapping](#user-defined-file-type-mapping)

# Usage

Help:
```
Usage: tfg [options] [command]

Options:
  -v, --version                 output the version number
  -p, --path <templatePath>     custom template folder path
  -n, --name <name>             change the name of the component (default is based on dest dir name)
  -c, --context <context>       pass in a json string to add to handlebar context when compiling template output
  -f, --filetypemap <map>       give a filetype map to change the file types of templates
  -x, --prefix <name>           add prefix to component file name
  -X, --postfix <name>          add postfix to component file name
  -d, --dryrun                  dry run
  -h, --help                    output usage information

Commands:
  templates|t
  generate|g [template] [dest]
```




# Template Creation

tfg uses [handlebars.js](https://handlebarsjs.com/) syntax.

## Default Template Variables:

## Example Template

```js
import * as React from 'react';
import './index.less';

class {{component.name.capitalizedSnakeCase}} extends React.Component{
  render(){
    return (
      <div className="{{component.name.snakeCase}}">
        {{component.name.original}}
      </div>
    );
  }
}
```


## User Defined Context

Suppose you have a template:

```js
function Person(){
  this.name = "{{person.name}}";
  this.age = {{person.age}};
}
```

you can provide custom context like so:

```bash
tfg g my-template -c '{"person":{ "name":"Bob","age":"40"}'
```

###### Please note to put single quotes around the json string and double quotes on field names

this will generate:
```js
function Person(){
  this.name = "Bob";
  this.age = 40;
}
```

tfg comes with a default set of context. Based either by the current working directory name (process.cwd()) or given -n --name <name> argument

suppose the user is in /Desktop/myProject/myComponent. But the user gave a name arg `-n myCoolComponent`. The context will be as follows:

```js
const context = {
  ...userDefinedContext,
  component: {
    name: {
      original: 'myCoolComponent',
      hypen: 'my-cool-component',
      snakeCase: 'myCoolComponent',
      capitalizedSnakeCase: 'MyCoolComponent',
    },
  },
  filename: 'index',
  dirName: 'myComponent',
  userDefinedName: 'myCoolComponent'
};
```

## User Defined File Type Mapping

Suppose you had a template like below:
```
├── package.json
├── templates
│   ├── my-react-component
│   │   ├── {{filename}}.js
```

but I want to change file extension from `.js` to `.jsx`
you can do this:

```bash
tfg g my-template -f '{"js":"jsx"}'
# will output my-react-component.jsx
```


###### Please note to not include the '.' and put single quotes around the json string and double quotes on field names

## Change Filenames

#### Generating with custom name:
```bash
tfg g default-react-class -n super-cool-component
# super-cool-component.js
```

#### Generating with prefix :
```bash
tfg g default-react-class -x my-
# my-super-cool-component.js
```

#### Generating with postfix :
```bash
tfg g default-react-class -X .test
# my-super-cool-component.test.js
```

## Dry Run

dry run will not output files but give you a stdout output of the compiled template
```bash
tfg g default-react-class g -d

```

stdout:
```bash
[Dry run] will generate file to path: /absolute/path/to/target/folder
================== SOF ==========================
import React, { Component } from 'react';
import './index.css'

export default Test extends Component{
  static defaultProps = {
  }
  state = {
  }
  /*
  componentWillMount(){
  }
  componentDidMount(){
  }
  shouldComponentUpdate(nextProps,nextState){
    return true;
  }
  componentWillReceiveProps(nextProps,nextState){
    return true;
  }
  componentWillUpdate(nextProps,nextState){
  }
  componentDidUpdate(prevProps,prevState){
  }
  componentWillUnmount(prevProps,prevState){
  }
  */
  render(){
    return (
      <div className="test">
        test
      </div>
    )
  }
}

<<<<<<<<<<<<<<<<<< EOF <<<<<<<<<<<<<<<<<<<<<<<<<<

done
```
