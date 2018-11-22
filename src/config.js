require('dotenv').config();

module.exports = {
    logFolder: process.env.LOG_FOLDER || `${process.cwd()}/logs`,
}
