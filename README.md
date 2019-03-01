Templated Folder Generator
==================================

# Installation
```bash
npm install git+ssh://git@gitlab.alipay-inc.com:xun.xc/react-component-template-generator.git
```

# Quick Start

## Generating Components

```bash
cd path/to/my/new/react/component/directory
tfg g ts-component
```

or

```bash
tfg g ts-component path/to/my/new/react/component/directory
```

## Generating Components with custom name:
```bash
cd path/to/my/new/react/component/directory
tfg g ts-component -n super-cool-component
```

## Generating Components with custom template folder

Example:
1. create a folder with the below structure within your project
#### template folder structure:
```
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
cd path/to/my/new/react/component/directory
tfg g my-less-template -p path/to/my/custom/template/folder
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

rctg uses [handlebars.js](https://handlebarsjs.com/) syntax.

## Default Template Variables:

## Example Template

```js
import * as React from 'react';
import * as style from './index.less';

interface IProps {
  children?: JSX.Element[];
}

interface IState {
  foo: boolean;
}

class {{component.name.capitalizedSnakeCase}} extends React.Component<IProps>{
  static defaultProps = {
  }
  state = {
    foo: false
  }
  /*
  componentDidMount(){
  }
  shouldComponentUpdate(nextState,nextProps){
    return true;
  }
  componentDidUpdate(prevProps,prevState){
  }
  componentWillUnmount(prevProps,prevState){
  }
  */
  render(){
    return (
      <div className={style.{{component.name.snakeCase}}>
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

```
tfg g my-template -c '{"person":{ name:"Bob",age:"40"}'
```

this will generate:
```js
function Person(){
  this.name = "Bob";
  this.age = 40;
}
```

rctg comes with a default set of context. Based either by the current working directory name (process.cwd()) or given -n --name <name> argument

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

####

## User Defined File Type Mapping


//TODO
