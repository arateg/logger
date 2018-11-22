const { WebClient } = require('@slack/client');


class Slack {
    constructor() { 
        this.slackClient = new WebClient(process.env.SLACK_ACCESS_TOKEN || SLACK_ACCESS_TOKEN);
        this.receiver = process.env.SLACK_RECEIVER || conversationId
    }
    
    async sendMessage(message) {
        const resp = await this.slackClient.chat.postMessage({
            channel: this.receiver ,
            text: message,
        })
        console.log(resp)
    }

}
