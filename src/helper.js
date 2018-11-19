const moment = require('moment');

module.exports.fullDateTime = (dateObj) => moment(dateObj).format('DD/MM/YYYY HH:mm:ss');

