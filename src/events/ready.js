const { Client, GuildChannel, ThreadChannel } = require("discord.js");

module.exports = {
	name: 'ready',
	once: true,
	/**
	 * 
	 * @param {Client} client 
	 */
	async execute(client) {
		const startTime = Date.now();
		console.log(`Ready! Logged in as ${client.user.tag}`);
		await client.guilds.fetch();
		console.log(`Connected to ${client.guilds.cache.size} guilds`);
		// Reading cache to load previous message send
		for (const [key, guild] of client.guilds.cache.entries()) {
			console.log(`Fetching ${guild.name} channels`);
			await guild.channels.fetch();
			for (const [key, guildChannel] of guild.channels.cache.entries()) {
				if (guildChannel instanceof GuildChannel) {
					if (guildChannel.isText()) {
						console.log(`Fetching ${guild.name} -> ${guildChannel.name} channels`);
						await guildChannel.messages.fetch();
					} else {
						console.log(`Unknow type ${guildChannel.type}`);
					}
				} else if (guildChannel instanceof ThreadChannel) {
					console.log(`TODO: Thread channel`);
				} else {
					console.log(`Unknow guildChannel type`);
				}
				
			}
		}

		console.log(`Bot loaded in ${Date.now()-startTime}ms`);
	},
};