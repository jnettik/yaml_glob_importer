
/**
 * @file
 * Main module export file.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const yaml = require('js-yaml');

module.exports = function (pattern) {
  const data = {};

  glob.sync(pattern).forEach((file) => {
    const absPath = path.resolve(file);
    const fileData = fs.readFileSync(absPath, 'utf8');
    const config = yaml.safeLoad(fileData);

    // Export module of config keyed by file name.
    data[path.basename(file, '.yml')] = config;
  });

  return data;
};
