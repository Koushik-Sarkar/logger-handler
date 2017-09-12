# logger-handler
Easily access logger. Handle all config from .env 

Usage:

If one have environment variable "LOG_LEVEL" to set log level
===========================================

import { logger } from 'pwc-us-agc-logger'

logger.log('info', 'log info');
logger.log('error', 'log error');

NOTE: If LOG_LEVEL variable not set in .env file, it will still work with default level 'info'

--------------------------------------------------------------------------------------------------------------------

If one do not have environment variable and want to set log level as well 
===================================================

import { log } from 'pwc-us-agc-logger';

const logger = log.getLogger(<log_level>); 

logger.log('info', 'my info');
logger.log('error', 'my error');
logger.log('debug', 'my degug');

                                  OR
import { log } from 'pwc-us-agc-logger';

const logger = log.getLogger(); // if want to use default log level

logger.log('info', 'my info');
logger.log('error', 'my error');
logger.log('debug', 'my degug');

