const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");

// Infos
exports.help = {
    name:"ping"
}

exports.run = async (bot, message, args) => {
    message.reply("Calcule du ping...").then(resultMessage => {
        const ping = resultMessage.createdTimestamp - message.createdTimestamp
		const apiPing = bot.ws.ping

        const PING = new MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('**Ping**')
	        .setDescription("🏓 Pong")
            .addFields(
                { name: '🔧 - Latence :', value: `${ping}ms.` },
                { name: '🔥 - Latence | API', value: `${apiPing}ms.` },
            )
	        .setTimestamp()
	        .setFooter({ text: config.client.name, iconURL: config.client.logo});

        message.channel.send({ embeds: [PING] });
    })
}