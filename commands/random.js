const axios = require('axios');

module.exports = {
  name: 'random',
  description: 'random anime image',
  usage: 'random <type> <category>',
  async execute(message, args, config) {
    if (args.length < 2) {
      return message.channel.send(`\`\`\`Usage: ${config.prefix}anime "type" "category"\`\`\`\nAvailable types: sfw, nsfw\nAvailable categories for sfw: waifu, neko, shinobu, megumin, bully, cuddle, cry, hug, awoo, kiss, lick, pat, smug, bonk, yeet, blush, smile, wave, highfive, handhold, nom, bite, glomp, slap, kill, kick, happy, wink, poke, dance, cringe\nAvailable categories for nsfw: neko, trap, blowjob`);
    }

    const [type, category] = args;
    
    const validTypes = ['sfw', 'nsfw'];
    const validSfwCategories = ['waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'];
    const validNsfwCategories = ['neko', 'trap', 'blowjob'];

    if (!validTypes.includes(type.toLowerCase())) {
      return message.channel.send(`\`\`\`❕ Invalid type. Available types: ${validTypes.join(', ')}\`\`\``);
    }

    if (type.toLowerCase() === 'sfw' && !validSfwCategories.includes(category.toLowerCase())) {
      return message.channel.send(`\`\`\`❕ Invalid category for sfw. Available categories: ${validSfwCategories.join(', ')}\`\`\``);
    }

    if (type.toLowerCase() === 'nsfw' && !validNsfwCategories.includes(category.toLowerCase())) {
      return message.channel.send(`\`\`\`❕ Invalid category for nsfw. Available categories: ${validNsfwCategories.join(', ')}\`\`\``);
    }

    try {
      const response = await axios.get(`https://api.waifu.pics/${type}/${category}`);
      const imageUrl = response.data.url;

      if (!imageUrl) {
        return message.channel.send(`\`\`\`❌ No image found for the specified type and category.\`\`\``);
      }

      await message.channel.send(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
      message.channel.send(`\`\`\`❌ An error occurred while trying to fetch the image.\`\`\``);
    }
  }
};
