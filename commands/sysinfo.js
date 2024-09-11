const os = require('os');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'sysinfo',
  description: 'Displays detailed system and bot information',
  async execute(message, client) {
    const commandsDir = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));
    const totalCommands = commandFiles.length;

    const totalFiles = fs.readdirSync(path.join(__dirname, '../')).reduce((count, dir) => {
      const dirPath = path.join(__dirname, '../', dir);
      return count + (fs.lstatSync(dirPath).isDirectory() ? fs.readdirSync(dirPath).length : 0);
    }, 0);

    const uptime = client.uptime / 1000; // Convert from milliseconds to seconds
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const uptimeFormatted = 
      days > 0 
        ? `${days}d ${hours}h ${minutes}m` 
        : hours > 0 
        ? `${hours}h ${minutes}m ${seconds}s` 
        : minutes > 0 
        ? `${minutes}m ${seconds}s` 
        : `${seconds}s`;

    const memoryUsage = process.memoryUsage();
    const totalMemory = os.totalmem() / 1024 / 1024;
    const freeMemory = os.freemem() / 1024 / 1024;
    const usedMemory = totalMemory - freeMemory;

    const ping = Date.now() - message.createdTimestamp;
    const cpuModel = os.cpus()[0].model;
    const cpuCores = os.cpus().length;

    const neofetchOutput = `
**Mommy SelfBot Info**:
\`\`\`yaml
OS: ${os.type()} ${os.release()}
Kernel: ${os.version()}
Uptime: ${uptimeFormatted}
CPU: ${cpuModel} (${cpuCores} cores)
Memory: ${usedMemory.toFixed(2)} MB / ${totalMemory.toFixed(2)} MB
Ping: ${ping} ms

**Bot Info**:
Commands: ${totalCommands}
Files: ${totalFiles}
\`\`\`
    `;

    const sentMessage = await message.channel.send(neofetchOutput);
    setTimeout(() => {
      sentMessage.delete();
    }, 5000); // Deletes the message after 5 seconds
  }
};
