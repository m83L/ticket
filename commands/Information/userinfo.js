const { MessageEmbed } = require('discord.js');
const config = require('../../config');

// Infos
exports.help = {
    name:"userinfo"
}

exports.run = async (bot, message) => {
    if(message.mentions.users.first()) {
        user = message.mentions.users.first();
       } else{
        user = message.author;
    }
    const member = message.mentions.users.first() || message.author;

    const USERINFOS = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Information sur ${user.username}#${user.discriminator} :`)
        .addField('▫ ID du membre :', `${user.id}`, false)
        .addField('▫ Pseudo sur le serveur :', `${member.nickname ? member.nickname : user.username}`, false)
        .addField('▫ Dates de création du compte :', `${user.createdAt.toLocaleDateString('en-GB')}`, false)
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp()
        .setFooter({ text: config.client.name, iconURL: config.client.logo});

    message.channel.send({ embeds: [USERINFOS] });
}