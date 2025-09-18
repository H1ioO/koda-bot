const { AuditLogEvent, PermissionFlagsBits } = require("discord.js");
const logs = require("../../util/logs.js");

module.exports = async (db) => {
        
    const auditLogs = await (await db.guild).fetchAuditLogs({ type: AuditLogEvent.MemberRoleUpdate, limit: 1 });
    const auditEntry = auditLogs.entries.first();
    if (!auditEntry) return;
    
    const executor = await (await db.guild).members.fetch(auditEntry.executor.id).catch(() => null);
    if (executor) {
        let perm = "";
        let punish = "";
        let user_punish = false;
        
        if (await db.get(`roleaddwl_${(await db.guild).id}`) === null) perm = await db.client.user.id === executor.id || (await db.guild).ownerId === executor.id || await db.client.config.owner.includes(executor.id) || await db.get(`owner_${await db.client.user.id}_${executor.id}`) === true || await db.get(`wl_${(await db.guild).id}_${executor.id}`) === true;
        if (await db.get(`roleaddwl_${(await db.guild).id}`) === true) perm = await db.client.user.id === executor.id || (await db.guild).ownerId === executor.id || await db.client.config.owner.includes(executor.id) || await db.get(`owner_${await db.client.user.id}_${executor.id}`) === true;
        
        if (await db.get(`roleadd_${(await db.guild).id}`) === true && !perm) {
            const addroles = [];
            const newMember = await db.newMember;
            const oldMember = await db.oldMember;
            newMember.roles.cache.forEach((role) => {
                if (!oldMember.roles.cache.has(role.id)) addroles.push(role);
            });
            
            for (const role of addroles) {
                if (role.permissions.has([
                    PermissionFlagsBits.ManageRoles,
                    PermissionFlagsBits.MentionEveryone,
                    PermissionFlagsBits.ManageGuild,
                    PermissionFlagsBits.ManageChannels,
                    PermissionFlagsBits.Administrator,
                    PermissionFlagsBits.KickMembers,
                    PermissionFlagsBits.BanMembers
                ])) {
                    if (!await db.get(`roleaddsanction_${(await db.guild).id}`) || await db.get(`roleaddsanction_${(await db.guild).id}`) === "kick") punish = "kick";
                    if (await db.get(`roleaddsanction_${(await db.guild).id}`) === "ban") punish = "ban";
                    if (await db.get(`roleaddsanction_${(await db.guild).id}`) === "derank") punish = "derank";
                    
                    const obj2 = {
                        client: await db.client,
                        guild: await db.guild,
                        db: db,
                        executor: executor.id,
                        punish: `🟢 ${punish}`,
                        name: "Ajout de rôle avec des permissions dangereuses",
                        roles: `${role.id}`
                    };
                    const obj3 = {
                        client: await db.client,
                        guild: await db.guild,
                        db: db,
                        executor: executor.id,
                        punish: `🔴 ${punish}`,
                        name: "Ajout de rôle avec des permissions dangereuses",
                        roles: `${role.name}`
                    };
                    
                    await db.oldMember.roles.remove(role.id).catch(() => { });
                    
                    if (punish === "ban") {
                        const rsl = await executor.ban({ reason: `Antiraid | Ajout de rôle avec des permissions dangereuses` }).catch(() => { });
                        if (rsl) user_punish = true;
                    } else if (punish === "kick") {
                        const rsl = await executor.kick(`Antiraid | Ajout de rôle avec des permissions dangereuses`).catch(() => { });
                        if (rsl) user_punish = true;
                    } else if (punish === "derank") {
                        const rsl = await executor.roles.set([], `Antiraid | Ajout de rôle avec des permissions dangereuses`).catch(() => { });
                        if (rsl) user_punish = true;
                    }
                    
                    if (user_punish) return logs(obj2);
                    else return logs(obj3);
                }
            }
        }
    }
}
