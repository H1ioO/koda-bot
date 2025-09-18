const { ChannelType, EmbedBuilder } = require('discord.js');

module.exports = async (db) => {
    if (await db.author.bot) return;
    if (await db.channel.type === ChannelType.DM) return;

    const prefix = await db.get(`prefix_${await db.guild.id}`) === null ? await db.client.config.prefix : await db.get(`prefix_${await db.guild.id}`);
    const color = await db.get(`color_${await db.guild.id}`) === null ? await db.client.config.color : await db.get(`color_${await db.guild.id}`);

    if (await db.content.match(new RegExp(`^<@!?${await db.client.user.id}>( |)$`)) !== null) {
        if (await db.client.config.owner.includes(await db.author.id) || await db.get(`owner_${await db.client.user.id}_${await db.author.id}`) === true) {

            const embed = new EmbedBuilder()
                .setDescription(`Mon préfixe : \`${prefix}\``)
                .setColor(color);
            return await db.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
        }
    }

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${await db.client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(await db.content)) return;
    const [, matchedPrefix] = (await db.content).match(prefixRegex);
    const args = (await db.content).slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = await db.client.commands.get(commandName) || await db.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (command) command.go(await db.client, db, await db, args, prefix, color);
}