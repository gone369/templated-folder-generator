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
--- template
  |
  --- my-template
  | |
  | --- index.js
  |
  --- my-other-template
    |
    --- index.tsx
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
  -f, --filetype <map>          give a filetype map to change the file types of templates
  -x, --prefix <name>           add prefix to component file name
  -X, --postfix <name>          add postfix to component file name
  -d, --dryrun                  dry run
  -h, --help                    output usage information

Commands:
  templates|t
  generate|g [template] [dest]
```

# Template Creation

## Default Template Variables:

```js
const context = {
  component: {
    name: {
      original: 'string',
      hypen: 'string',
      snakeCase: 'string',
      capitalizedSnakeCase: 'string',
    },
  },
  name: 'string'
};
```


# Examples

