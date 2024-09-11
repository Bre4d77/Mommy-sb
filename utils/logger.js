const chalk = require('chalk');

const getTimestamp = () => {
  return new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
};

const log = (type, message) => {
  const timestamp = chalk.gray(`[${getTimestamp()}]`);
  switch (type) {
    case 'command':
      console.log(timestamp, chalk.blue('[COMMAND]'), message);
      break;
    case 'event':
      console.log(timestamp, chalk.green('[EVENT]'), message);
      break;
    case 'login':
      console.log(timestamp, chalk.cyan('[LOGIN]'), message);
      break;
    case 'afk':
      console.log(timestamp, chalk.yellow('[AFK]'), message);
      break;
    case 'math':
      console.log(timestamp, chalk.magenta('[MATH]'), message);
      break;
    default:
      console.log(timestamp, chalk.white('[INFO]'), message);
  }
};

const error = (message, ...args) => {
  const timestamp = chalk.gray(`[${getTimestamp()}]`);
  console.error(timestamp, chalk.red('[ERROR]'), message, ...args);
};

module.exports = { log, error };