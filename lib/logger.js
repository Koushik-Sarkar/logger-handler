'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);

    this.LOGGER_LEVEL = ['error', 'warn', 'info', 'verbose', 'debug'];
    this.DEFAULT_LOG_LEVEL = 'info';
    this.logger = new _winston2.default.Logger({
      transports: [new _winston2.default.transports.Console({
        handleExceptions: true,
        humanReadableUnhandledException: true,
        timestamp: true,
        json: true
      })]
    });
  }

  _createClass(Logger, [{
    key: 'setLogLevel',
    value: function setLogLevel(input) {
      if (input) {
        var logLevel = ('' + input).toLowerCase();
        if (this.LOGGER_LEVEL.indexOf(logLevel) > -1) {
          this.logger.transports.console.level = logLevel;
        } else {
          this.logger.transports.console.level = this.DEFAULT_LOG_LEVEL;
        }
      } else {
        this.logger.transports.console.level = this.DEFAULT_LOG_LEVEL;
      }
    }
  }, {
    key: 'getLogger',
    value: function getLogger(logLevel) {
      this.setLogLevel(logLevel);
      return this.logger;
    }
  }]);

  return Logger;
}();

exports.default = Logger;