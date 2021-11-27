const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clear text channnel!'),
    /**
     * @param {CommandInteraction} interaction 
     */
	async execute(interaction) {
        try {
            console.log(`Is application command ${interaction.isApplicationCommand()}`)
            let messageList = await interaction.channel.messages.fetch();
            let messageDeleted = 0;

            for (const [key, value] of messageList.entries()) {
                await value.delete();
                messageDeleted++;
            }
            await interaction.reply({
                content: `Removed ${messageDeleted} message`,
                ephemeral: true
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: `There was an error while executing this command!`,
                ephemeral: true
            });
        }
	},
}; 