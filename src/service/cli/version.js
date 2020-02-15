'use strict';

const packageJsonFile = require(`../../../package`);

module.exports = {
  name: `--version`,
  run() {
    const {version} = packageJsonFile;
    console.info(version);
  }
};
