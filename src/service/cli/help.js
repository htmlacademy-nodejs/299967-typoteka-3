'use strict';

const chalk = require(`chalk`);

const text = chalk`
Программа запускает http-сервер и формирует файл с данными для API.

{yellow Гайд:}
  server <command>;
{yellow Команды:}
  --version:            выводит номер версии
  --help:               печатает этот текст
  --generate <count>    формирует файл mocks.json
`;

module.exports = {
  name: `--help`,
  run() {
    console.log(chalk.blue(text));
  }
};
