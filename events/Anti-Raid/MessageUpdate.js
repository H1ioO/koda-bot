const logs = require("../../util/logs.js");

module.exports = async (db) => {
        
    const discord = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|com)|discordapp\.com\/invite)\/.+/i;
    if (!discord.test(await db.newMessage.content)) return;
    
    const executor = await (await db.guild).members.fetch(await db.oldMessage.author.id).catch(() => null);
    if (executor) {
        let perm = "";
        let punish = "";
        let user_punish = false;
        
        if (await db.get(`pubwl_${(await db.guild).id}`) === null) perm = await db.client.user.id === executor.id || (await db.guild).ownerId === executor.id || await db.client.config.owner.includes(executor.id) || await db.get(`owner_${await db.client.user.id}_${executor.id}`) === true || await db.get(`wl_${(await db.guild).id}_${executor.id}`) === true;
        if (await db.get(`pubwl_${(await db.guild).id}`) === true) perm = await db.client.user.id === executor.id || (await db.guild).ownerId === executor.id || await db.client.config.owner.includes(executor.id) || await db.get(`owner_${await db.client.user.id}_${executor.id}`) === true;
        
        if (await db.get(`pub_${(await db.guild).id}`) === true && !perm) {
            if (!await db.get(`pubsanction_${(await db.guild).id}`) || await db.get(`pubsanction_${(await db.guild).id}`) === "kick") punish = "kick";
            if (await db.get(`pubsanction_${(await db.guild).id}`) === "ban") punish = "ban";
            if (await db.get(`pubsanction_${(await db.guild).id}`) === "derank") punish = "derank";
            
            const obj2 = {
                client: await db.client,
                guild: await db.guild,
                db: db,
                executor: executor.id,
                punish: `🟢 ${punish}`,
                name: "Message contenant une invitation discord",
            };
            const obj3 = {
                client: await db.client,
                guild: await db.guild,
                db: db,
                executor: executor.id,
                punish: `🔴 ${punish}`,
                name: "Message contenant une invitation discord",
            };
            
            await db.newMessage.delete().catch(() => { });
            
            if (punish === "ban") {
                const rsl = await executor.ban({ reason: `Antiraid | Message contenant une invitation discord` }).catch(() => { });
                if (rsl) user_punish = true;
            } else if (punish === "kick") {
                const rsl = await executor.kick(`Antiraid | Message contenant une invitation discord`).catch(() => { });
                if (rsl) user_punish = true;
            } else if (punish === "derank") {
                const rsl = await executor.roles.set([], `Antiraid | Message contenant une invitation discord`).catch(() => { });
                if (rsl) user_punish = true;
            }
            
            if (user_punish) return logs(obj2);
            else return logs(obj3);
        }
    }
}