'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const {ExitCode, MOCK_FILE} = require(`../../const`);
const {sendResponse, getMockTitles, getTitleList} = require(`../../utils`);

const DEFAULT_PORT = 3000;
const HttpStatusCode = {
  OK: 200,
  NOT_FOUND: 404,
};

const onConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const titles = await getMockTitles(`./${MOCK_FILE}`);
        const message = getTitleList(titles);
        sendResponse(HttpStatusCode.OK, message, res);
      } catch (err) {
        sendResponse(HttpStatusCode.NOT_FOUND, http.STATUS_CODES[HttpStatusCode.NOT_FOUND], res);
      }
      break;

    default: sendResponse(HttpStatusCode.NOT_FOUND, http.STATUS_CODES[HttpStatusCode.NOT_FOUND], res);
  }
};

module.exports = {
  name: `--server`,
  run(arg) {
    const [customPort] = arg;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          console.error(chalk.red(`Server creation error: ${err}`));
          process.exit(ExitCode.ERROR);
        }

        console.info(chalk.green(`Listening port ${port}...`));
      });

    return ExitCode.WORKING;
  }
};
