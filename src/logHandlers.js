const logger = require('./logger');
const Mailer = require('./mailer');
const { redlog, greenlog, cyanlog, magentalog } = require('./colorizing');

module.exports = {
    daemon: (message, report) => {
        greenlog(message, report),
        logger.log('debug', message, report)
    },
    info: (message, report) => {
        cyanlog(message, report),
        logger.log('info', message, report)
    },
    email: async (message, report) => {
        const GmailSender = new Mailer();
        await GmailSender.sendMail(report);
        },
    error: (message, report) => {
        redlog(message, report);
        logger.log('error', message, report)
    },
    full: (message, report) => {
        magentalog(message, report);
        logger.log('silly', message, report)
    },
    warn: (message, report) => {
        magentalog(message, report),
        logger.log('warn', message, report)
    },
}