const axios = require('axios');

module.exports = {
  name: 'weather',
  async execute(message, args) {
    const location = args.join(' ');
    if (!location) {
      return message.channel.send('```Usage: weather <location>```');
    }

    try {
      const { data } = await axios.get(`https://wttr.in/${location}?format=3`);
      message.channel.send(`\`\`\`${data}\`\`\``);
    } catch (error) {
      message.channel.send('```Could not retrieve weather data.```');
    }
  }
};
