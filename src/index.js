import dotenv from 'dotenv';
import Logger from './logger';

dotenv.config();

const log = new Logger();
let logDirPath;
let logFileName;
let logger = null;

if (process.env.NODE_ENV && process.env.LOGGER_TYPE === 'console') {
  logger = log.getLoggerWithConsole();
} else if (!process.env.NODE_ENV && process.env.LOG_LEVEL) {
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
  logger,
  log
};
