const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction, CommandInteraction, MessageEmbed, Message } = require('discord.js');

/**
 * @param {Date} date 
 */
function dayWeekAndMonth(date) { 
    return date.toLocaleString(
        'en-us', 
        {  
            weekday: 'long',
            day: '2-digit',
            month: 'long'
        }
    );
}

/**
 * @param {Date} date 
 */
function onlyDay(date) {
    return date.toLocaleDateString(
        'en-us',
        {
            weekday: 'long',
            day: '2-digit'
        }
    );
}

function numberToEmoteStr(number) {
    switch(number) {
        case 1: return '1️⃣';
        case 2: return '2️⃣';
        case 3: return '3️⃣';
        case 4: return '4️⃣';
        case 5: return '5️⃣';
        case 6: return '6️⃣';
        case 7: return '7️⃣';
        default: return '?';
    }
          
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('init-planning')
		.setDescription('Init planning on this channel!'),
    /**
     * @param {CommandInteraction} interaction 
     */
	async execute(interaction) {
        try {
            //await interaction.channel.send('TODO: Add description how to use bot ?');
            var curr = new Date; // get current date
            var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
            var last = first + 6; // last day is the first day + 6

            var firstday = dayWeekAndMonth(new Date(curr.setDate(first)));
            var lastday = dayWeekAndMonth(new Date(curr.setDate(last)));

            var message = `@here the raid for ${firstday} to ${lastday}\n\n`;

            for (let i = 0 ; i < 7 ; i++) {
                var date = new Date(firstday);
                date.setDate(date.getDate() + i)
                message += `React ${numberToEmoteStr(i+1)} for ${onlyDay(date)}\n`;
            }
            const messageResult = await interaction.channel.send(message);
            for (let i = 0 ; i < 7 ; i++) {
                messageResult.react(numberToEmoteStr(i+1));
            }

            await interaction.reply({content: `Planner loaded on this channel!`,ephemeral: true});
        } catch (error) {
            console.error(error);
            await interaction.reply({content: `There was an error while executing this command!`,ephemeral: true});
        }
	},
};