const nodemailer = require('nodemailer');

const { redlog, yellowlog } = require('./colorizing');


// Turn On if you got an error:  Invalid login: 534-5.7.14 
// https://myaccount.google.com/lesssecureapps


module.exports = class MailSender {

    constructor() {
        this.author = process.env.SMTP_USER;
        this.receivers = this.getReceiversEmails();
        this.domain = process.env.DOMAIN || require('os').networkInterfaces()['wlp3s0'][0].address;
        this.transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 25,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    createMessage(reportObject, emailSubject) {
        return {
            from: this.author, 
            to: this.receivers,
            subject: `${emailSubject} ON ${this.domain}`,
            text: JSON.stringify(reportObject) || 'NO REPORT MESSAGE'        
        }
    }

    getReceiversEmails () {
        const receiversAddresses = []
        try {
            receiversAddresses.push(process.env.EMAIL_RECEIVERS.split().map(email => email.trim()));
        } catch(error) {
            const errorResponse =  {
                sendMailErrorReason: "No EMAIL RECEIVERS in .env file",
                message: error.message + ' Receiver was set to smptUser',
            };
            redlog('====================\n', errorResponse);
            return this.author;
        }
        return receiversAddresses;
    }

    async sendMail(reportObject, emailSubject='ERROR') {
        reportObject['timestamp'] = new Date();
        let mailData;
        try {
           mailData = this.createMessage(reportObject, emailSubject);
        } catch(error) {
            return redlog('ERROR ON CREATING MESSAGE TO SEND. MAIL WAS NOT SENT', error);    
        }
        try {
            const responseFromEmailSending = await this.transport.sendMail(mailData);
            if (!responseFromEmailSending.response.split(' ', 1)) {
                return redlog('Email was not sent!!!', reportObject); 
            };
            yellowlog('Message was successfully sent', responseFromEmailSending)
        } catch(error) {
            this.sendMailErrorhandling(error, reportObject);
        }
    }

    sendMailErrorhandling(error, report) {
        let errorReason;
        switch(error.code.toUpperCase()){
            case 'ECONNECTION': 
                errorReason = "CAN'T CONNECT TO SMTP SERVER " + error.host;
                break;
            case 'EAUTH':
                errorReason = 'SMTP AUTHENTIFICATION FAILED';
                break;
            default:
                errorReason = error.message; 
        }
        redlog('ERROR WITH EMAIL SENDING. THE REASON:', errorReason);
        redlog('ERROR MESSAGE:', report);
    }
}

