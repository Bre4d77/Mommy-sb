module.exports = {
  name: 'timer',
  async execute(message, args) {
    const time = parseInt(args[0]);
    if (isNaN(time)) {
      return message.channel.send('```Invalid time format. Usage: timer <seconds>```');
    }
    
    let remainingTime = time;
    const sentMessage = await message.channel.send(`\`\`\`Timer: ${remainingTime} seconds remaining.\`\`\``);

    const interval = setInterval(() => {
      remainingTime -= 5;
      if (remainingTime > 0) {
        sentMessage.edit(`\`\`\`Timer: ${remainingTime} seconds remaining.\`\`\``);
      } else {
        clearInterval(interval);
        sentMessage.edit('```Time\'s up!```');
      }
    }, 5000); // Update every 5 seconds

    setTimeout(() => {
      clearInterval(interval);
      sentMessage.edit('```Time\'s up!```');
    }, time * 1000); // Final timeout when time runs out
  }
};
