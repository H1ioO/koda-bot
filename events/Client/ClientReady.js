
const { ActivityType } = require('discord.js');

module.exports = async (db) => {
    console.log(`> Connecter: ${await db.client.user.tag}`);
    await db.client.user.setActivity(`&help`, { type: ActivityType.Playing });
    await db.client.config.owner.forEach(async e => {
        if(await db.get(`owner_${await db.client.user.id}_${e}`) !== true) await db.set(`owner_${await db.client.user.id}_${e}`, true);
    });
}