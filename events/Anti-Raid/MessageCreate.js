const logs = require("../../util/logs.js");

module.exports = async (db) => {
    
    const message = await db.message;
    const guild = await db.guild;
    const client = await db.client;
    const executor = await db.member;

    if (!message || !guild || !executor) return;

    if (["@everyone", "@here"].some(word => message.content.includes(word))) {

        let perm = "";

        await db.add(`messagespingcount_${guild.id}_${executor.id}`, 1)
        if (await db.get(`pingwl_${guild.id}`) === null) perm = (await db.get(`messagespingcount_${guild.id}_${executor.id}`)) <= 3 || client.user.id === executor.id || guild.ownerId === executor.id || client.config.owner.includes(executor.id) || await db.get(`owner_${client.user.id}_${executor.id}`) === true || await db.get(`wl_${guild.id}_${executor.id}`) === true;
        if (await db.get(`pingwl_${guild.id}`) === true) perm = (await db.get(`messagespingcount_${guild.id}_${executor.id}`)) <= 3 || client.user.id === executor.id || guild.ownerId === executor.id || client.config.owner.includes(executor.id) || await db.get(`owner_${client.user.id}_${executor.id}`) === true;
        if (await db.get(`ping_${guild.id}`) === true && !perm) {
            const obj2 = { client, guild, db, executor: executor.id, punish: `🟢 exclusion 5m`, name: "Multiplication de ping" };
            const obj3 = { client, guild, db, executor: executor.id, punish: `🔴 exclusion 5m`, name: "Multiplication de ping" };
            await db.delete(`messagespingcount_${guild.id}_${executor.id}`);
            await message.delete().catch(()=>{});
            const rsl = await executor.roles.set([], `Antiraid | Multiplication de ping`).catch(() => { });
            const rsl2 = await executor.timeout(60000 * 5, `Antiraid | Multiplication de ping`).catch(() => { });
            if (rsl && rsl2) return logs(obj2); else return logs(obj3);
        }
    }

    {

        const count = await db.add(`messagespamcount_${guild.id}_${executor.id}`, 1);
        setTimeout(() => { db.delete(`messagespamcount_${guild.id}_${executor.id}`); }, 20000);
        if (count >= 5) {
            let perm = "";
            if (await db.get(`spamwl_${guild.id}`) === null) perm = client.user.id === executor.id || guild.ownerId === executor.id || client.config.owner.includes(executor.id) || await db.get(`owner_${client.user.id}_${executor.id}`) === true || await db.get(`wl_${guild.id}_${executor.id}`) === true;
            if (await db.get(`spamwl_${guild.id}`) === true) perm = client.user.id === executor.id || guild.ownerId === executor.id || client.config.owner.includes(executor.id) || await db.get(`owner_${client.user.id}_${executor.id}`) === true;
            if (await db.get(`spam_${guild.id}`) === true && !perm) {
                const obj2 = { client, guild, db, executor: executor.id, punish: `🟢 exclusion 5m`, name: "Multiplication de message" };
                const obj3 = { client, guild, db, executor: executor.id, punish: `🔴 exclusion 5m`, name: "Multiplication de message" };
                const spammsg = await message.channel.messages.fetch({ limit: 5 }).catch(()=>null);
                if (spammsg) spammsg.filter(msg => msg.author.id === executor.id).forEach(m => { m.delete().catch(() => { }); });
                const rsl = await executor.roles.set([], `Antiraid | Multiplication de message`).catch(() => { });
                const rsl2 = await executor.timeout(60000 * 5, `Antiraid | Multiplication de message`).catch(() => { });
                if (rsl && rsl2) return logs(obj2); else return logs(obj3);
            }
        }
    }

    {
        const discord = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|com)|discordapp\.com\/invite)\/.+/i;
        if (discord.test(message.content)) {
            
            const name = "Message contenant une invitation discord";
            let perm = "";
            const count = await db.add(`pubcount_${guild.id}_${executor.id}`, 1);
            if (await db.get(`pubwl_${guild.id}`) === null) perm = client.user.id === executor.id || guild.ownerId === executor.id || client.config.owner.includes(executor.id) || await db.get(`owner_${client.user.id}_${executor.id}`) === true || await db.get(`wl_${guild.id}_${executor.id}`) === true;
            if (await db.get(`pubwl_${guild.id}`) === true) perm = client.user.id === executor.id || guild.ownerId === executor.id || client.config.owner.includes(executor.id) || await db.get(`owner_${client.user.id}_${executor.id}`) === true;
            if (await db.get(`pub_${guild.id}`) === true && !perm) {
                const obj2 = { client, guild, db, executor: executor.id, punish: `🟢 exclusion 5m`, name };
                const obj3 = { client, guild, db, executor: executor.id, punish: `🔴 exclusion 5m`, name };
                await message.delete().catch(()=>{});
                if (count >= 3) {
                    const rsl = await executor.roles.set([], `Antiraid | Message contenant une invitation discord`).catch(() => { });
                    const rsl2 = await executor.timeout(60000 * 5, `Antiraid | Message contenant une invitation discord`).catch(() => { });
                    if (rsl && rsl2) return logs(obj2); else return logs(obj3);
                }
            }
        }
    }
}


