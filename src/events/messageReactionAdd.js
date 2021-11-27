module.exports = {
	name: 'messageReactionAdd',
	async execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};