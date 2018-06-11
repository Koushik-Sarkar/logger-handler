import winston from 'winston';
import appRoot from 'app-root-path';
import fs from 'fs';

class Logger {
  constructor() {
    this.LOGGER_LEVEL = ['error', 'warn', 'info', 'verbose', 'debug'];
    this.DEFAULT_LOG_LEVEL = 'info';
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          handleExceptions: true,
          humanReadableUnhandledException: true,
          timestamp: this.tsFormat,
          formatter: this.logFormatter,
          json: true,
          level: 'debug'
        })
      ]
    });
  }

  logFormatter(options) {
    return `[${options.timestamp()}] - [${options.level.toUpperCase()}] -` + (options.message ? options.message : ``) +
      (options.meta && Object.keys(options.meta).length ?
        `\n\t` + JSON.stringify(options.meta) : ``);
  };

  tsFormat() {
    const d = new Date();
    var yyyy = d.getFullYear().toString();                                    
    var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based         
    var dd  = d.getDate().toString();    
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]) + ` ` + d.getHours() + `:` + d.getMinutes() + `:` +
      d.getSeconds()
  };

  setLogLevel(input) {
    if (input) {
      const logLevel = (`${input}`).toLowerCase();
      if (this.LOGGER_LEVEL.indexOf(logLevel) > -1) {
        this.logger.transports.console.level = logLevel;
      } else {
        this.logger.transports.console.level = this.DEFAULT_LOG_LEVEL;
      }
    } else {
      this.logger.transports.console.level = this.DEFAULT_LOG_LEVEL;
    }
  }

  setLogFiles(filePath = `${appRoot}/LOG_STORAGE`, fileName = 'filelog') {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
    this.logger.configure({
      transports: [
        new (winston.transports.File)({
          name: 'info-file',
          filename: `${filePath}/${fileName}-info.log`,
          formatter: this.logFormatter,
          timestamp: this.tsFormat,
          level: 'info',
          json : false
        }),
        new (winston.transports.File)({
          name: 'error-file',
          filename: `${filePath}/${fileName}-error.log`,
          formatter: this.logFormatter,
          timestamp: this.tsFormat,
          level: 'error',
          json : false
        })
      ]
    });
  }
  getLogger(logLevel) {
    this.setLogLevel(logLevel);
    return this.logger;
  }
  getLoggerWithLogFilesSpecified(filePath, fileName) {
    this.setLogFiles(filePath, fileName);
    return this.logger;
  }

  getLoggerWithLogFiles() {
    this.setLogFiles();
    return this.logger;
  }

}

export default Logger;
