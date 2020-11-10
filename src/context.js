function initDefaultContext({componentName, filename, dirName}) {
  const hyphenName = componentName.replace(/([a-z][A-Z])/g, function (g) {
    return g[0] + "-" + g[1].toLowerCase();
  });

  const snakeCase = hyphenName.replace("-", "_");

  lowerCasedHyphenName = hyphenName[0].toLowerCase() + hyphenName.slice(1);

  const lowerCasedSnakeCase = lowerCasedHyphenName.replace("-", "_");

  let camelCaseName = componentName.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });

  camelCaseName = camelCaseName[0].toLowerCase() + camelCaseName.slice(1);

  const capitalizedCamelCaseName =
    camelCaseName[0].toUpperCase() + camelCaseName.slice(1);

  const context = {
    component: {
      name: {
        original: componentName,
        hyphen: lowerCasedHyphenName,
        snakeCase: snakeCase,
        lowerCasedSnakeCase: lowerCasedSnakeCase,
        camelCase: camelCaseName,
        capitalizedCamelCase: capitalizedCamelCaseName,
        upperCase: componentName.toUpperCase(),
        lowerCase: componentName.toLowerCase(),
      },
    },
    filename,
    dirName,
  };

  return context;
}

module.exports = initDefaultContext;
