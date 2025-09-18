const { AuditLogEvent } = require("discord.js");
const logs = require("../../util/logs.js");

module.exports = async (db) => {
        
    const auditLogs = await (await db.guild).fetchAuditLogs({ type: AuditLogEvent.WebhookCreate, limit: 1 });
    const auditEntry = auditLogs.entries.first();
    if (!auditEntry) return;
    
    const executor = await (await db.guild).members.fetch(auditEntry.executor.id).catch(() => null);
    if (executor) {
        let perm = "";
        let punish = "";
        let user_punish = false;
        
        if (await db.get(`webhookwl_${(await db.guild).id}`) === null) perm = await db.client.user.id === executor.id || (await db.guild).ownerId === executor.id || await db.client.config.owner.includes(executor.id) || await db.get(`owner_${await db.client.user.id}_${executor.id}`) === true || await db.get(`wl_${(await db.guild).id}_${executor.id}`) === true;
        if (await db.get(`webhookwl_${(await db.guild).id}`) === true) perm = await db.client.user.id === executor.id || (await db.guild).ownerId === executor.id || await db.client.config.owner.includes(executor.id) || await db.get(`owner_${await db.client.user.id}_${executor.id}`) === true;
        
        if (await db.get(`webhook_${(await db.guild).id}`) === true && !perm) {
            if (!await db.get(`webhooksanction_${(await db.guild).id}`) || await db.get(`webhooksanction_${(await db.guild).id}`) === "kick") punish = "kick";
            if (await db.get(`webhooksanction_${(await db.guild).id}`) === "ban") punish = "ban";
            if (await db.get(`webhooksanction_${(await db.guild).id}`) === "derank") punish = "derank";
            
            const obj2 = {
                client: await db.client,
                guild: await db.guild,
                db: db,
                executor: executor.id,
                punish: `🟢 ${punish}`,
                name: "Création de webhook",
                salon: `${await db.channelUpdated.name}`
            };
            const obj3 = {
                client: await db.client,
                guild: await db.guild,
                db: db,
                executor: executor.id,
                punish: `🔴 ${punish}`,
                name: "Création de webhook",
                salon: `${await db.channelUpdated.name}`
            };

            const clonedChannel = await db.channelUpdated.clone({
                name: await db.channelUpdated.name,
                permissionOverwrites: await db.channelUpdated.permissionOverwrites,
                type: await db.channelUpdated.type,
                parent: await db.channelUpdated.parent,
                topic: await db.channelUpdated.topic,
                nsfw: await db.channelUpdated.nsfw,
                bitrate: await db.channelUpdated.bitrate,
                userLimit: await db.channelUpdated.userLimit,
                rateLimitPerUser: await db.channelUpdated.rateLimitPerUser,
                position: await db.channelUpdated.rawPosition,
                reason: `Antiraid | Création de webhook`
            }).catch(() => { });
            
            await db.channelUpdated.delete().catch(() => { });

            if (punish === "ban") {
                const rsl = await executor.ban({ reason: `Antiraid | Création de webhook` }).catch(() => { });
                if (rsl) user_punish = true;
            } else if (punish === "kick") {
                const rsl = await executor.kick(`Antiraid | Création de webhook`).catch(() => { });
                if (rsl) user_punish = true;
            } else if (punish === "derank") {
                const rsl = await executor.roles.set([], `Antiraid | Création de webhook`).catch(() => { });
                if (rsl) user_punish = true;
            }
            
            if (user_punish) return logs(obj2);
            else return logs(obj3);
        }
    }
}
