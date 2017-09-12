import winston from 'winston';

class Logger {
  constructor() {
    this.LOGGER_LEVEL = ['error', 'warn', 'info', 'verbose', 'debug'];
    this.DEFAULT_LOG_LEVEL = 'info';
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          handleExceptions: true,
          humanReadableUnhandledException: true,
          timestamp: true,
          json: true
        })
      ]
    });
  }
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
  getLogger(logLevel) {
    this.setLogLevel(logLevel);
    return this.logger;
  }
}

export default Logger;
