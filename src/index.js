const fs = require('fs');
// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
require('dotenv').config();

const intent = new Intents();
intent.add();

// Create a new client instance
const client = new Client(
	{
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		],
	},
);

client.commands = new Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
	console.log(`event ${event.name} loaded`);
}

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN).catch(console.error);


// Invite link at :
const linkBase = 'https://discord.com/api/oauth2/authorize';
const linkClientId = `?client_id=${process.env.clientId}`;
const linkPermission = '&permissions=8';
const linkRemaining = '&scope=bot%20applications.commands';
const fullDiscordLinkInvite = linkBase + linkClientId + linkPermission + linkRemaining;
console.log(`Discord invite at ${fullDiscordLinkInvite}`);