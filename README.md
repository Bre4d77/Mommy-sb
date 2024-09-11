
# Mommy Self-Bot

Welcome to **Mommy Self-Bot**, a powerful self-bot designed to enhance your Discord experience with a wide range of features and integrations.

## Features

### Free Version

The free version of Mommy Self-Bot provides essential functionalities to get you started:

- **Basic Command Functions**: Access a core set of commands to manage your Discord interactions.
- **API Integrations**: Utilize popular APIs for a seamless experience.
- **Customizable Settings**: Adjust settings to fit your preferences.

### Premium Version

Upgrade to the **premium version** for access to advanced features and tools:

- **Anime Downloader**: Download anime content with dedicated commands.
- **Pornhub Downloader**: Retrieve and download content from Pornhub.
- **AI Image Generation**: Generate high-quality images using state-of-the-art AI models.
- **AI Text Generation**: Produce text with advanced AI text generation capabilities.
- **Future Enhancements**: Additional commands and features will be added over time.

To purchase the premium version, please DM **Bre4d77** on Discord for more information.

## Installation Guide

### Prerequisites

Ensure you have the following before setting up the bot:

- [Node.js](https://nodejs.org/en/) (version 16.x or higher)

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Bre4d77/Mommy-sb.git
   cd Mommy-sb
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure the Bot**:

   Create a `config.json` file in the root directory and fill in the necessary details:

   ```json
   {
     "token": "YOUR_DISCORD_TOKEN",
     "prefix": "YOUR_PREFIX",
     "allowedIds": ["YOUR_ALLOWED_USER_ID_1", "YOUR_ALLOWED_USER_ID_2"],
     "timeZone": "Asia/Kolkata",
     "showTime": true,
     "attackMode": false,
     "afkMode": false,
     "afkReason": "",
     "afkStartTime": null,
     "pings": []
   }
   ```

   - Replace `"YOUR_DISCORD_TOKEN"` with your Discord token.
   - Replace `"YOUR_PREFIX"` with your desired command prefix.
   - Replace `"YOUR_ALLOWED_USER_ID_1"` and `"YOUR_ALLOWED_USER_ID_2"` with the Discord IDs of users who are allowed to use the bot.
   - dont edit other options as they are for commands if u edit them the bot womt function properly 

4. **Start the Bot**:
   ```bash
   npm start
   ```

5. **Enjoy**: The bot will now be operational in your Discord server.

## License

This project is licensed under the ISC License. For more details, please refer to the [LICENSE](LICENSE) file.

## Support

For support, issues, or inquiries about the premium version, please DM **Bre4d77** on Discord.
