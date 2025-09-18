const { AuditLogEvent } = require("discord.js");
const logs = require("../../util/logs.js");

module.exports = async (db) => {
        
    const auditLogs = await (await db.guild).fetchAuditLogs({ type: AuditLogEvent.ChannelDelete, limit: 1 });
    const auditEntry = auditLogs.entries.first();
    if (!auditEntry) return;
    
    const executor = await (await db.guild).members.fetch(auditEntry.executor.id).catch(() => null);
    if (executor) {
        let perm = "";
        let punish = "";
        let user_punish = false;
        
        if (await db.get(`channeldeletewl_${(await db.guild).id}`) === null) perm = await db.client.user.id === executor.id || (await db.guild).ownerId === executor.id || await db.client.config.owner.includes(executor.id) || await db.get(`owner_${await db.client.user.id}_${executor.id}`) === true || await db.get(`wl_${(await db.guild).id}_${executor.id}`) === true;
        if (await db.get(`channeldeletewl_${(await db.guild).id}`) === true) perm = await db.client.user.id === executor.id || (await db.guild).ownerId === executor.id || await db.client.config.owner.includes(executor.id) || await db.get(`owner_${await db.client.user.id}_${executor.id}`) === true;
        
        if (await db.get(`channeldelete_${(await db.guild).id}`) === true && !perm) {
            if (!await db.get(`channeldeletesanction_${(await db.guild).id}`) || await db.get(`channeldeletesanction_${(await db.guild).id}`) === "kick") punish = "kick";
            if (await db.get(`channeldeletesanction_${(await db.guild).id}`) === "ban") punish = "ban";
            if (await db.get(`channeldeletesanction_${(await db.guild).id}`) === "derank") punish = "derank";
            
            const obj2 = {
                client: await db.client,
                guild: await db.guild,
                db: db,
                executor: executor.id,
                punish: `🟢 ${punish}`,
                name: "Suppression de salon",
                salon: `${await db.name}`
            };
            const obj3 = {
                client: await db.client,
                guild: await db.guild,
                db: db,
                executor: executor.id,
                punish: `🔴 ${punish}`,
                name: "Suppression de salon",
                salon: `${await db.name}`
            };
            
            await db.clone({
                name: await db.name,
                permissionOverwrites: await db.permissionOverwrites,
                type: await db.type,
                parent: await db.parent,
                topic: await db.topic,
                nsfw: await db.nsfw,
                bitrate: await db.bitrate,
                userLimit: await db.userLimit,
                rateLimitPerUser: await db.rateLimitPerUser,
                position: await db.rawPosition,
                reason: `Antiraid | Suppression de salon`
            }).catch(() => { });
            
            if (punish === "ban") {
                const rsl = await executor.ban({ reason: `Antiraid | Suppression de salon` }).catch(() => { });
                if (rsl) user_punish = true;
            } else if (punish === "kick") {
                const rsl = await executor.kick(`Antiraid | Suppression de salon`).catch(() => { });
                if (rsl) user_punish = true;
            } else if (punish === "derank") {
                const rsl = await executor.roles.set([], `Antiraid | Suppression de salon`).catch(() => { });
                if (rsl) user_punish = true;
            }
            
            if (user_punish) return logs(obj2);
            else return logs(obj3);
        }
    }
}