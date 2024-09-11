module.exports = {
  name: 'showpings',
  async execute(message, args, config) {
    if (!config.afkMode) {
      const reply = await message.channel.send('AFK mode is not currently enabled.');
      setTimeout(() => reply.delete(), 5000); // Delete after 5 seconds
      return;
    }

    if (config.pings.length === 0) {
      const reply = await message.channel.send('No pings received while AFK.');
      setTimeout(() => reply.delete(), 5000); // Delete after 5 seconds
      return;
    }

    const pingList = config.pings.map(ping => `[${ping.user}](${ping.link})`).join('\n');
    const pingMessage = await message.channel.send(`**Pings received while AFK:**\n${pingList}`);
    setTimeout(() => pingMessage.delete(), 30000); // Delete after 30 seconds
  }
};
