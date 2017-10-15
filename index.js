
/**
 * @file
 * Main module export file.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob-fs')({ gitignore: true });
const yaml = require('js-yaml');

module.exports = function (pattern) {
  const data = {};

  glob.readdirSync(pattern, (err, files) => {
    files.forEach((file) => {
      const fileName = path.basename(file);
      const fileContents = fs.readFileSync(`${__dirname}/${fileName}`, 'utf8');
      const config = yaml.safeLoad(fileContents);
      const json = JSON.stringify(config, null, 4);

      // Export module of config keyed by file name.
      data[path.basename(file, '.js')] = json;
    });
  });

  return data;
};
