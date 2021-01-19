'use strict';

module.exports = {
  ExitCode: {
    SUCCESS: 0,
    ERROR: 1,
    WORKING: 2,
  },

  DURATION: 1000 * 60 * 60 * 24 * 90,
  MIN_SENTENCES_COUNT: 5,
  MAX_SENTENCES_COUNT: 50,
  MIN_COMMENT_COUNT: 0,
  MAX_COMMENT_COUNT: 5,
  MIN_CATEGORY_COUNT: 1,
  MAX_CATEGORY_COUNT: 3,
  ANNOUNCE_SENTENCES_COUNT: 5,
  MOCK_FILE: `mocks.json`,
  ID_LENGTH: 6,
  DEFAULT_PORT: 3000,

  HttpStatusCode: {
    OK: 200,
    CREATE: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  },

  HttpStatusInfo: {
    NOT_FOUND: `Not found`,
    SERVER_ERROR: `Server error`,
    BAD_REQUEST: `Bad request`,
  },

  ANNOUNCE_LENGTH: 400,
};
