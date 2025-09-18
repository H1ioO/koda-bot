const { EmbedBuilder } = require("discord.js");

const logs = async (db) => {

    if (!(await db.guild)) return;
    
    const logsChannel = await db.guild.channels.cache.get(await db.get(`logs_${await db.guild.id}`));
    const color = await db.get(`color_${await db.guild.id}`) === null ? await db.client.config.color : await db.get(`color_${await db.guild.id}`);

    const embed = new EmbedBuilder();
    embed.setAuthor({ name: `📰 ${await db.name}`, iconURL: await db.iconURL });
    embed.setDescription(`Autheur: \`<@${await db.executor}>\`\nSanction: \`${await db.punish}\``);
    embed.setThumbnail(await db.thumbnail);
    embed.setTimestamp();
    
    if (await db.salon) embed.addFields({ name: "Salon:", value: `\`${await db.salon}\``, inline: true });
    if (await db.user) embed.addFields({ name: "Membre:", value: `<@${await db.user}>`, inline: true });
    if (await db.roles) embed.addFields({ name: "Roles:", value: `<@&${await db.roles}>`, inline: true });
    if (await db.bot) embed.addFields({ name: "Bot:", value: `<@${await db.bot}>`, inline: true });
    if (await db.limit) embed.addFields({ name: "Limit:", value: `${await db.limit}`, inline: true });
    
    embed.setColor(color);
    
    if (logsChannel) logsChannel.send({ embeds: [embed] });
};

module.exports = logs