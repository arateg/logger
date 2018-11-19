require('dotenv').config();

module.exports = {
    logFolder: process.env.LOG_FOLDER || `${__dirname}/../logs`
}