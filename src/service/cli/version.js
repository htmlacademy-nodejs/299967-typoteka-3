'use strict';

const packageJSON = require(`../../../package.json`);
const chalk = require(`chalk`);
const {ExitCode} = require(`../../const`);

module.exports = {
  name: `--version`,
  run() {
    console.info(chalk.blue(packageJSON.version));
    return ExitCode.SUCCESS;
  }
};
