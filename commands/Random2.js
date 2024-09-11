const axios = require('axios');

module.exports = {
  name: 'random2',
  description: 'Fetch a random anime image',
  usage: 'random2 <type>',
  async execute(message, args, config) {
    if (args.length < 1) {
      return message.channel.send(`\`\`\`Usage: ${config.prefix}random <type>\`\`\`\nAvailable types: ${['hass', 'hmidriff', 'pgif', '4k', 'hentai', 'holo', 'hneko', 'neko', 'hkitsune', 'kemonomimi', 'anal', 'hanal', 'gonewild', 'kanna', 'ass', 'pussy', 'thigh', 'hthigh', 'gah', 'coffee', 'food', 'paizuri', 'tentacle', 'boobs', 'hboobs', 'yaoi', 'cosplay', 'swimsuit', 'pantsu', 'nakadashi'].join(', ')}`);
    }

    const [type] = args;
    
    const validTypes = ['hass', 'hmidriff', 'pgif', '4k', 'hentai', 'holo', 'hneko', 'neko', 'hkitsune', 'kemonomimi', 'anal', 'hanal', 'gonewild', 'kanna', 'ass', 'pussy', 'thigh', 'hthigh', 'gah', 'coffee', 'food', 'paizuri', 'tentacle', 'boobs', 'hboobs', 'yaoi', 'cosplay', 'swimsuit', 'pantsu', 'nakadashi'];
    
    if (!validTypes.includes(type.toLowerCase())) {
      return message.channel.send(`\`\`\`❕ Invalid type. Available types: ${validTypes.join(', ')}\`\`\``);
    }

    try {
      const response = await axios.get(`https://nekobot.xyz/api/image?type=${type}`, {
        headers: {
          'Authorization': '015445535454455354D6'
        }
      });

      const imageUrl = response.data.message;

      if (!imageUrl) {
        return message.channel.send(`\`\`\`❌ No image found for the specified type.\`\`\``);
      }

      await message.channel.send(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
      message.channel.send(`\`\`\`❌ An error occurred while trying to fetch the image.\`\`\``);
    }
  }
};
