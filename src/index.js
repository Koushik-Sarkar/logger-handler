import dotenv from 'dotenv';
import Logger from './logger';

dotenv.config();

const log = new Logger();
const logger = log.getLogger(process.env.LOG_LEVEL);


module.exports = {
  logger,
  log
};
