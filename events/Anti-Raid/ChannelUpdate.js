const { AuditLogEvent } = require("discord.js");
const logs = require("../../util/logs.js");

module.exports = async (db) => {
    
    const auditLogs = await (await db.guild).fetchAuditLogs({ type: AuditLogEvent.ChannelUpdate, limit: 1 });
    const auditEntry = auditLogs.entries.first();
    if (!auditEntry) return;
    
    const executor = await (await db.guild).members.fetch(auditEntry.executor.id).catch(() => null);
    if (executor) {
        let perm = "";
        let punish = "";
        let user_punish = false;
        
        if (await db.get(`channelediwl_${(await db.guild).id}`) === null) perm = await db.client.user.id === executor.id || (await db.guild).ownerId === executor.id || await db.client.config.owner.includes(executor.id) || await db.get(`owner_${await db.client.user.id}_${executor.id}`) === true || await db.get(`wl_${(await db.guild).id}_${executor.id}`) === true;
        if (await db.get(`channelediwl_${(await db.guild).id}`) === true) perm = await db.client.user.id === executor.id || (await db.guild).ownerId === executor.id || await db.client.config.owner.includes(executor.id) || await db.get(`owner_${await db.client.user.id}_${executor.id}`) === true;
        
        if (await db.get(`channeledit_${(await db.guild).id}`) === true && !perm) {
            if (!await db.get(`channeleditanction_${(await db.guild).id}`) || await db.get(`channeleditanction_${(await db.guild).id}`) === "kick") punish = "kick";
            if (await db.get(`channeleditanction_${(await db.guild).id}`) === "ban") punish = "ban";
            if (await db.get(`channeleditanction_${(await db.guild).id}`) === "derank") punish = "derank";
            
            const obj2 = {
                client: await db.client,
                guild: await db.guild,
                db: db,
                executor: executor.id,
                punish: `🟢 ${punish}`,
                name: "Modification de salon",
                salon: `${await db.oldChannel.name}`
            };
            const obj3 = {
                client: await db.client,
                guild: await db.guild,
                db: db,
                executor: executor.id,
                punish: `🔴 ${punish}`,
                name: "Modification de salon",
                salon: `${await db.oldChannel.name}`
            };
            
            await db.newChannel.edit({
                name: await db.oldChannel.name,
                permissionOverwrites: await db.oldChannel.permissionOverwrites,
                type: await db.oldChannel.type,
                topic: await db.oldChannel.topic,
                nsfw: await db.oldChannel.nsfw,
                bitrate: await db.oldChannel.bitrate,
                userLimit: await db.oldChannel.userLimit,
                rateLimitPerUser: await db.oldChannel.rateLimitPerUser,
                position: await db.oldChannel.rawPosition,
                reason: `Antiraid | Modification de salon`
            }).catch(() => { });
            
            if (punish === "ban") {
                const rsl = await executor.ban({ reason: `Antiraid | Modification de salon` }).catch(() => { });
                if (rsl) user_punish = true;
            } else if (punish === "kick") {
                const rsl = await executor.kick(`Antiraid | Modification de salon`).catch(() => { });
                if (rsl) user_punish = true;
            } else if (punish === "derank") {
                const rsl = await executor.roles.set([], `Antiraid | Modification de salon`).catch(() => { });
                if (rsl) user_punish = true;
            }
            
            if (user_punish) return logs(obj2);
            else return logs(obj3);
        }
    }
}