module.exports = {
  name: 'nukechannel',
  async execute(message, args, config) {
    try {
      const channel = message.channel;

      // Clone the channel
      const newChannel = await channel.clone({
        name: channel.name,
        type: channel.type,
        topic: channel.topic || '',
        nsfw: channel.nsfw,
        rateLimitPerUser: channel.rateLimitPerUser,
        position: channel.position,
        permissionOverwrites: channel.permissionOverwrites.cache.map(overwrite => ({
          id: overwrite.id,
          allow: overwrite.allow.toArray(),
          deny: overwrite.deny.toArray(),
        })),
      });

      // Delete the old channel
      await channel.delete();

      // Send confirmation and video to the new channel
      newChannel.send(`\`\`\`✅ Channel successfully cloned. The old channel has been deleted.\`\`\``);
      newChannel.send('Lmao https://media.tenor.com/cxT0O08famEAAAPo/we-do-a-little-trolling-trolling.mp4');

    } catch (error) {
      console.error('Error cloning channel:', error);
      message.channel.send(`\`\`\`❌ An error occurred while trying to clone the channel.\`\`\``);
    }
  }
};
