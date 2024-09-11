const { Client,  Collection } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const { log, error } = require('./utils/logger');

const client = new Client({ checkUpdate: false });
client.commands = new Collection();
client.config = config;

// Load commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  try {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    log('command', `Loaded command: ${command.name}`);
  } catch (err) {
    error(`Error loading command ${file}:`, err);
  }
}

// Load events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  try {
    const event = require(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
    log('event', `Loaded event: ${event.name}`);
  } catch (err) {
    error(`Error loading event ${file}:`, err);
  }
}

// Anti-crash
process.on('unhandledRejection', (reason, promise) => {
  error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  error('Uncaught Exception:', err);
});

client.on('error', (err) => {
  error('Discord Client Error:', err);
});

client.login(config.token).then(() => {
  log('login', 'Bot has logged in successfully');
}).catch((err) => {
  error('Failed to log in:', err);
  process.exit(1);
});
