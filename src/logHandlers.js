const logger = require('./logger');
const Mailer = require('./mailer');
const { redlog, greenlog, cyanlog, magentalog, graylog, yellowlog } = require('./colorizing');
const Slack = require('./messengers/slack');


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
        const MailSender = new Mailer();
        await MailSender.sendMail(report);
        },
    error: (message, report) => {
        redlog(message, report);
        logger.log('error', message, report)
    },
    full: (message, report) => {
        graylog(message, report);
        logger.log('silly', message, report)
    },
    warn: (message, report) => {
        magentalog(message, report),
        logger.log('warn', message, report)
    },
    slack: async (message, report) => {
        report['timestamp'] = new Date();
        try {
        const response = await Slack.sendMessage(report);
        yellowlog('Sent to slack', response);
        } catch(error) {
            redlog(`Did not sent to slack log: ${JSON.stringify(report)} ||`, {reason: error.message})
        }
    }
}
