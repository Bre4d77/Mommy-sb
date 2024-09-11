const { log, error } = require('../utils/logger');

function safeEval(expr) {
  return Function('"use strict";return (' + expr + ')')();
}

let lastAfkReply = 0;

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot) return;

    const { config } = client;

    // Handle AFK responses
    if (config.afkMode && message.mentions.has(client.user)) {
      const now = Date.now();
      if (now - lastAfkReply > 10000) {
        lastAfkReply = now;
        const timeElapsed = config.afkStartTime ? Math.floor((now - config.afkStartTime) / 1000) : 0;
        const reason = config.afkReason || 'No reason provided';
        try {
          await message.reply(`Huihui I am currently afk.\nReason: ${reason}. Time: ${timeElapsed}s ago`);
          config.pings.push({
            user: message.author.tag,
            content: message.content,
            link: message.url,
            timestamp: new Date()
          });
          log('afk', `Responded to AFK mention from ${message.author.tag}`);
        } catch (err) {
          error('Error sending AFK reply:', err);
        }
      }
      return;
    }

    // Handle math expressions
    const mathExpression = message.content.trim().match(/^([-+]?[0-9]*\.?[0-9]+[\+\-\*\/])+(-?[0-9]*\.?[0-9]+)$/);
    if (mathExpression) {
      if (!config.allowedIds.includes(message.author.id)) return;
      try {
        const result = safeEval(mathExpression[0]);
        if (!isNaN(result) && isFinite(result)) {
          await message.channel.send(`${result}`);
          await message.delete();
          log('math', `Calculated result for ${message.author.tag}: ${mathExpression[0]} = ${result}`);
        }
      } catch (err) {
        error('Calculator error:', err);
        await message.channel.send('Invalid expression or calculation error.').catch(e => error('Error sending calculator error message:', e));
      }
      return;
    }

    // Handle commands
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (command) {
      if (!config.allowedIds.includes(message.author.id)) return;
      try {
       if (command.attack) {
      

      if (!config.attackMode) {
        return message.channel.send('Attack mode is currently disabled.');
      }
    }
        await command.execute(message, args, config, client);
        await message.delete();
        log('command', `Executed command ${commandName} for ${message.author.tag}`);
      } catch (err) {
        error(`Error executing ${commandName}:`, err);
        await message.channel.send('An error occurred while executing the command.').catch(e => error('Error sending command error message:', e));
      }
    }
  },
};
