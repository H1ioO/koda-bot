const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: "Affiche la liste des commandes",
    aliases: ["h"],
    go: async (client, message, prefix, color) => {

            const embed = new EmbedBuilder()
                .setTitle(`Help`)
                .setColor(color)
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                .addFields(
                    { name: "Antiraid", value: `\`${prefix}antiraid [on/off/max/config]\n${prefix}whitelist <add/clear/list/remove>\``, inline: false },
                    { name: "Misc", value: `\`${prefix}help\n${prefix}ping\``, inline: false },
                    { name: "Owner", value: `\`${prefix}blacklist <add/clear/list/remove>\n${prefix}owner <add/clear/list/remove>\``, inline: false },
                )
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            message.reply({ content: null, embeds: [embed], allowedMentions: { repliedUser: false } });
        }
}
