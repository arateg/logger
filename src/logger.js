const winston = require('winston');
const config = require('./config');
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');

const logPath = config.logFolder;
const transports = [];


const transportFile = new (winston.transports.DailyRotateFile)({
  dirname: logPath,
  filename: 'LogError-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '200m',
  maxFiles: '30d',
  level: "error",
  json: true,
  format: winston.format.combine(
            winston.format.timestamp({
              format: 'DD-MM-YYYY HH:mm:ss'
            }),
            winston.format.json()
  )
});

const transportCombined = new (winston.transports.DailyRotateFile)({
  dirname: logPath,
  filename: 'LogCombined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '500m',
  maxFiles: '30d',
  level: "silly",
  json: true,
  format: winston.format.combine(
            winston.format.timestamp({
              format: 'DD-MM-YYYY HH:mm:ss'
            }),
            winston.format.json()
  )
});


transportFile.on('rotate', (oldFilename, newFilename) => {
  console.log('===== New log file =====');
});

transports.push(transportFile, transportCombined);

const logger = winston.createLogger({
  transports
});

module.exports = logger;
