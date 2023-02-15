// Load environment variables from .env file
require('dotenv').config();
// Import request
const request = require('request')

// Import the Discord.js library
const Discord = require('discord.js');

//Import Spotify API
const SpotifyWebApi = require('spotify-web-api-js');


// Define the intents to be used by the Discord client
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

// Create a new Discord client

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




// Spotify API Authorization
const options = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
  'Authorization': 'Basic ' + (new Buffer(process.env.Spotify_Client_Key + ':' + process.env.Spotify_Secret_Key).toString('base64'))
  },
  form: {
  grant_type: 'client_credentials'
  },
  json: true
  };
  
  let access_token = '';
  
  request.post(options, function(error, response, body) {
  if (!error && response.statusCode === 200) {
  console.log("Connected to Spotify API successfully!")
  // Store the access token for future use
  access_token = body.access_token;
  } else {
  console.log("Error connecting to Spotify API:", error)
  }
  });
  
// Listen for messages sent to the server
client.on('message', msg => {
  // Check if the message content is equal to "current song"
  if (msg.content === 'current song') {
    // Make a GET request to the Spotify Web API endpoint for retrieving the current user's playing track
    request.get({
      url: 'https://api.spotify.com/v1/me/player/currently-playing',
      headers: {
        'Authorization': 'Bearer ' + process.env.Spotify_Client_Keyc
      },
      json: true
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // Retrieve the track info
        const track = body.item;
        const trackName = track.name;
        const artist = track.artists[0].name;

        // Reply to the message with the current song info
        msg.reply(`The current song is "${trackName}" by ${artist}.`);
      } else {
        console.log("Error retrieving track data:", error);
      }
    });
  }
});