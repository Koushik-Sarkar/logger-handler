'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var log = new _logger2.default();
var logDirPath = void 0;
var logFileName = void 0;
var logger = null;
console.log(process.env.NODE_ENV + ' ' + process.env.LOG_LEVEL);

if (!process.env.NODE_ENV && process.env.LOG_LEVEL) {
  logger = log.getLogger(process.env.LOG_LEVEL);
} else {
  if (process.env.LOG_DIR_PATH) {
    logDirPath = process.env.LOG_DIR_PATH;
  }
  if (process.env.LOG_FILE_INITIAL_NAME) {
    logFileName = process.env.LOG_FILE_INITIAL_NAME;
  }
  logger = log.getLoggerWithLogFilesSpecified(logDirPath, logFileName);
}

module.exports = {
  logger: logger,
  log: log
};