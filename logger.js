const winston = require('winston');
require('winston-daily-rotate-file');

const logPath = __dirname + '/logs';
const appTransports = [];


const transportFile = new (winston.transports.DailyRotateFile)({
  dirname: logPath,
  filename: 'TMSLogError-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '200m',
  maxFiles: '30d',
  json: true,
  format: winston.format.combine(
            winston.format.timestamp({
              format: 'DD-MM-YYYY HH:mm:ss'
            }),
            winston.format.json()
  )
}, { level: "error" });

const transportCombined = new (winston.transports.DailyRotateFile)({
  dirname: logPath,
  filename: 'TMSLogCombined-%DATE%.log',
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

appTransports.push(transportFile, transportCombined);

const logger = winston.createLogger({
  transports: [
    ...appTransports
  ]
});

module.exports = logger;
