
class Messenger {
    constructor(client, receiver) {
        this.client = client;
        this.receiver = receiver
    }

    async sendMessage(message) {
        return await this.client.sendNotification(message, this.receiver);
    };
}

module.exports = Messenger;
