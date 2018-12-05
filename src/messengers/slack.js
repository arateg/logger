const { WebClient } = require('@slack/client');

const AbstractMessenger = require('./messenger');


class SlackWebClient extends WebClient {
    async sendNotification(message, receiver) {
        return await this.chat.postMessage({
            channel: receiver,
            text: message,
        });
    }
}


class Slack extends AbstractMessenger {
    constructor(receiver=process.env.SLACK_RECEIVER) { 
        if(!Slack.instance) {
            super(new SlackWebClient(process.env.SLACK_ACCESS_TOKEN), receiver);
            Slack.instance = this;
        }
        return Slack.instance;
    };

};


const SlackInstance = new Slack();
Object.freeze(SlackInstance);
module.exports = SlackInstance;
