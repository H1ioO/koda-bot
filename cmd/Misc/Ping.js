const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: "Affiche la latence du bot",
    aliases: ["latence"],
    go: async (client, message, prefix, color) => {
        const embed = new EmbedBuilder()
            .addFields(
                { name: "Ping", value: `Calcul en cours`, inline: true },
                { name: "Latence", value: `${client.ws.ping}ms`, inline: true }
            )
            .setColor(color)
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });
        
        const msg = await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        
        const embed2 = new EmbedBuilder()
            .addFields(
                { name: "Ping", value: `${msg.createdAt - message.createdAt}ms`, inline: true },
                { name: "Latence", value: `${client.ws.ping}ms`, inline: true }
            )
            .setColor(color)
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });
        
        return msg.edit({ embeds: [embed2] })
    }
}