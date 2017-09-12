'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var log = new _logger2.default();
var logger = log.getLogger(process.env.LOG_LEVEL);

module.exports = {
  logger: logger,
  log: log
};