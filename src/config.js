require('dotenv').config();

module.exports = {
    logFolder: process.env.LOG_FOLDER || `${process.cwd()}/logs`,
    domain: process.env.DOMAIN || require('os').networkInterfaces()['wlp3s0'][0].address
}
