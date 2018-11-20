const logger = require('./');

logger.InfoDaemon('some error', {err: {message: 'Unhandled error occured'}});