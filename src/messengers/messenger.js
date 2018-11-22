const Slack = require('./slack');

const messengers = {
    'slack': Slack
    }

class Messenger {

    static getMessenger(messengerName) {
        const messenger = messengers[messengerName];
        if (!messenger) { throw new Error('Incorrect messenger name!')};
        return new messenger()
    }

    static async sendNotification(messengerName, message) {
        const messenger = Messenger.getMessenger(messengerName)
        const response = await messenger.sendMessage(message);
        return response
    }
}

module.exports = Messenger;
