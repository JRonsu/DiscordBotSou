// Load environment variables from .env file
require('dotenv').config();

// Import the Discord.js library
const Discord = require('discord.js');

// Create a new Discord client
const client = new Discord.Client();

// Listen for the "ready" event and log a message when the bot is ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Listen for messages sent to the server
client.on('message', msg => {
  // Check if the message content is equal to "ping"
  if (msg.content === 'ping') {
    // If it is, reply with "Pong!"
    msg.reply('Pong!');
  }
});

// Log in to Discord using the token stored in the DISCORD_BOT_TOKEN environment variable
client.login(process.env.DISCORD_BOT_TOKEN);
