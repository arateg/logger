const chalk = require('chalk');
const { fullDateTime } = require('./helper');


const coloredConsole = (color) => (message, report) => {
    const timestamp = fullDateTime(new Date());
    console.log(chalk[color](message, JSON.stringify(report), timestamp))
};
const redlog = coloredConsole('red');
const greenlog = coloredConsole('green');
const cyanlog = coloredConsole('cyan');
const yellowlog = coloredConsole('yellow');
const magentalog = coloredConsole('magenta');

module.exports = {
    redlog,
    greenlog,
    cyanlog,
    yellowlog,
    magentalog
}
