module.exports = {
  name: 'attackmode',
  description: 'Enable or disable attack mode.',
  async execute(message, args, config) {
    let reply;
    
    if (message.author.id !== '931059762173464597') {
      reply = await message.channel.send('You do not have permission to use this command.');
      setTimeout(() => reply.delete(), 5000); // Delete after 5 seconds
      return;
    }

    if (args[0] === 'enable') {
      config.attackMode = true;
      reply = await message.channel.send('Attack mode has been enabled.');
      
    } else if (args[0] === 'disable') {
      config.attackMode = false;
      reply = await message.channel.send('Attack mode has been disabled.');
      
    } else {
      reply = await message.channel.send('Invalid usage. Use `p attackmode enable` or `p attackmode disable`.');
    }
    
    setTimeout(() => reply.delete(), 5000); // Delete after 5 seconds
  }
};
