'use strict';

const path = require(`path`);
const pino = require(`pino`);
// const fs = require(`fs`);

const logFile = path.resolve(__dirname, `logs`);

// if (fs.existsSync(logFile)) {
//   fs.unlinkSync(logFile);
// }

const LogMessage = {
  getEndRequest(url, statusCode) {
    return `End request of url ${url} ${statusCode ? `with status code ${statusCode}` : ``}`;
  },

  getStartRequest(url) {
    return `Start request to url ${url}`;
  },

  getSuccessCreatingServer(port) {
    return `Start server at port ${port}`;
  },

  getErrorCreatingServer(err) {
    return `Error creating server: ${err}`;
  },

  getUnknownRoute(url) {
    return `Unknown route: ${url}`;
  },

  getError(err) {
    return `Unknown error: ${err}`;
  },

  getUtilMessage(name, message) {
    return `${name} says: ${message}`;
  },

  getWrongObjectID(name, id) {
    return `${name} with id=${id} not found`;
  },

  printObject(name, object) {
    return `${name}: ${JSON.stringify(object)}`;
  }
};

const LoggerName = {
  DATA_SERVER: `data-server`,
  DATA_SERVER_API: `data-server:api`,
};

const logger = pino({
  name: LoggerName.DATA_SERVER_API,
  level: process.env.LOG_LEVEL || `info`,
  prettyPrint: {colorize: false},
}, logFile);

module.exports = {
  LoggerName,
  LogMessage,
  logger,
  getLogger(loggerName, options = {}) {
    options.name = loggerName;
    return logger.child(options);
  },
};
