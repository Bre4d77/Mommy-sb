module.exports = {
  name: 'afk',
  async execute(message, args, config) {
    let reply;
    
    if (args[0] === 'on') {
      config.afkMode = true;
      config.afkReason = args.slice(1).join(' ') || 'No reason provided';
      config.afkStartTime = new Date();
      reply = await message.channel.send(`AFK mode enabled. Reason: ${config.afkReason}`);
      
    } else if (args[0] === 'off') {
      config.afkMode = false;
      config.afkReason = '';
      config.afkStartTime = null;
      config.pings = []; // Clear pings when AFK mode is disabled
      reply = await message.channel.send('AFK mode disabled and pings cleared.');
      
    } else {
      reply = await message.channel.send('Usage: p.afk <on|off> [reason]');
    }
    
    setTimeout(() => reply.delete(), 5000); // Delete after 5 seconds
  }
};
