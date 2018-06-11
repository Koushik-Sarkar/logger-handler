'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

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
        timestamp: this.tsFormat,
        formatter: this.logFormatter,
        json: true,
        level: 'debug'
      })]
    });
  }

  _createClass(Logger, [{
    key: 'logFormatter',
    value: function logFormatter(options) {
      return '[' + options.timestamp() + '] - [' + options.level.toUpperCase() + '] -' + (options.message ? options.message : '') + (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
    }
  }, {
    key: 'tsFormat',
    value: function tsFormat() {
      var d = new Date();
      var yyyy = d.getFullYear().toString();
      var mm = (d.getMonth() + 1).toString(); // getMonth() is zero-based         
      var dd = d.getDate().toString();
      return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]) + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    }
  }, {
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
    key: 'setLogFiles',
    value: function setLogFiles() {
      var filePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _appRootPath2.default + '/LOG_STORAGE';
      var fileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'filelog';

      if (!_fs2.default.existsSync(filePath)) {
        _fs2.default.mkdirSync(filePath);
      }
      this.logger.configure({
        transports: [new _winston2.default.transports.File({
          name: 'info-file',
          filename: filePath + '/' + fileName + '-info.log',
          formatter: this.logFormatter,
          timestamp: this.tsFormat,
          level: 'info',
          json: false
        }), new _winston2.default.transports.File({
          name: 'error-file',
          filename: filePath + '/' + fileName + '-error.log',
          formatter: this.logFormatter,
          timestamp: this.tsFormat,
          level: 'error',
          json: false
        })]
      });
    }
  }, {
    key: 'getLogger',
    value: function getLogger(logLevel) {
      this.setLogLevel(logLevel);
      return this.logger;
    }
  }, {
    key: 'getLoggerWithLogFilesSpecified',
    value: function getLoggerWithLogFilesSpecified(filePath, fileName) {
      this.setLogFiles(filePath, fileName);
      return this.logger;
    }
  }, {
    key: 'getLoggerWithLogFiles',
    value: function getLoggerWithLogFiles() {
      this.setLogFiles();
      return this.logger;
    }
  }]);

  return Logger;
}();

exports.default = Logger;