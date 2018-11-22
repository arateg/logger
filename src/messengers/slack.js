const { WebClient } = require('@slack/client');

const { slackReceiver } = require('../config')

class Slack {
    constructor(receiver=process.env.SLACK_RECEIVER) { 
        this.slackClient = new WebClient(process.env.SLACK_ACCESS_TOKEN);
        this.receiver = receiver;
    };
    
    async sendMessage(message) {
        const response = await this.slackClient.chat.postMessage({
            channel: this.receiver,
            text: message,
        });
        return response;
    }
};

module.exports = Slack;
