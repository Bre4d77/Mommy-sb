const axios = require('axios');

module.exports = {
  name: 'animequote',
  async execute(message) {
    try {
      const { data } = await axios.get('https://animechan.xyz/api/random');
      message.channel.send(`\`\`\`${data.character} from ${data.anime}: "${data.quote}"\`\`\``);
    } catch (error) {
      message.channel.send('```Could not fetch anime quote.```');
    }
  }
};
