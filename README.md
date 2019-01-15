React Component Template Generator
==================================

# Installation
```
npm install git+ssh://git@gitlab.alipay-inc.com:xun.xc/react-component-template-generator.git
```

# Quick Start
### Generating Components

```
cd path/to/my/new/react/component/directory
rgen g ts-component
```

or

```
rgen g ts-component path/to/my/new/react/component/directory
```

### Generating Components with custom name:
```
cd path/to/my/new/react/component/directory
rgen g ts-component -n super-cool-component
```

or

```
rgen g ts-component path/to/my/new/react/component/directory -n super-cool-component
```


### Generating Components with custom template folder

```
cd path/to/my/new/react/component/directory
rgen g my-template -p path/to/my/custom/template/folder
```

###### template folder structure:
```
├── templates
│   ├── ts-component
│   │   ├── {{filename}}.d.less.ts
│   │   ├── {{filename}}.less
│   │   └── {{filename}}.tsx
│   ├── ts-element
│   │   ├── {{filename}}.d.less.ts
│   │   ├── {{filename}}.less
│   │   └── {{filename}}.tsx
```

### Check Available Templates


```
rgen t
```

##### Checking Available Templates with your own template dir
```
rgen t -p path/to/my/custom/template/folder
```

### Dry Run (won't generate file)
```
rgen g my-template -d
```

# Usage

Help: 
```
Usage: rgen [options] [command]

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

rctg uses [handlebars.js](https://handlebarsjs.com/)

## Default Template Variables:


### Example Template

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


### User Defined Context

Suppose you have a template: 

```js
function Person(){
  this.name = "{{person.name}}";
  this.age = {{person.age}};
}
```

you can provide custom context like so:

```
rgen g my-template -c '{"person":{ name:"lao da",age:"40"}'
```

this will generate: 
```js
function Person(){
  this.name = "lao da";
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
  userDefinedName: 'myCoolComponent
};
```

##### 

### Custom File Type Mapping 


//TODO
