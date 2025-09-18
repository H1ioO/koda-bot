const { AuditLogEvent } = require("discord.js");
const logs = require("../../util/logs.js");

module.exports = async (db) => {
    const auditLogs = await (await db.guild).fetchAuditLogs({ type: AuditLogEvent.GuildUpdate, limit: 1 });
    const auditEntry = auditLogs.entries.first();
    if (!auditEntry) return;

    const executor = await (await db.guild).members.fetch(auditEntry.executor.id).catch(() => null);
    if (!executor) return;

    let perm = "";
    let punish = "";
    let user_punish = false;

    if (await db.get(`updatewl_${(await db.guild).id}`) === null) perm = await db.client.user.id === executor.id || (await db.guild).ownerId === executor.id || await db.client.config.owner.includes(executor.id) || await db.get(`owner_${await db.client.user.id}_${executor.id}`) === true || await db.get(`wl_${(await db.guild).id}_${executor.id}`) === true;
    if (await db.get(`updatewl_${(await db.guild).id}`) === true) perm = await db.client.user.id === executor.id || (await db.guild).ownerId === executor.id || await db.client.config.owner.includes(executor.id) || await db.get(`owner_${await db.client.user.id}_${executor.id}`) === true;

    if (await db.get(`update_${(await db.guild).id}`) === true && !perm) {
        if (!await db.get(`updatesanction_${(await db.guild).id}`) || await db.get(`updatesanction_${(await db.guild).id}`) === "kick") punish = "kick";
        if (await db.get(`updatesanction_${(await db.guild).id}`) === "ban") punish = "ban";
        if (await db.get(`updatesanction_${(await db.guild).id}`) === "derank") punish = "derank";

        const obj2 = {
            client: await db.client,
            guild: await db.guild,
            db: db,
            executor: executor.id,
            punish: `🟢 ${punish}`,
            name: "Modification du serveur",
        };
        const obj3 = {
            client: await db.client,
            guild: await db.guild,
            db: db,
            executor: executor.id,
            punish: `🔴 ${punish}`,
            name: "Modification du serveur",
        };

        try {

            if (await db.oldGuild?.name) await db.guild.setName(await db.oldGuild.name).catch(() => {});
            if (await db.oldGuild?.iconURL) await db.guild.setIcon(await db.oldGuild.iconURL()).catch(() => {});
            if (await db.oldGuild?.bannerURL) await db.guild.setBanner(await db.oldGuild.bannerURL()).catch(() => {});
            if (await db.oldGuild?.systemChannel) await db.guild.setSystemChannel(await db.oldGuild.systemChannel).catch(() => {});
            if (await db.oldGuild?.systemChannelFlags) await db.guild.setSystemChannelFlags(await db.oldGuild.systemChannelFlags).catch(() => {});
            if (await db.oldGuild?.verificationLevel !== undefined) await db.guild.setVerificationLevel(await db.oldGuild.verificationLevel).catch(() => {});
            if (await db.oldGuild?.rulesChannel) await db.guild.setRulesChannel(await db.oldGuild.rulesChannel).catch(() => {});
            if (await db.oldGuild?.publicUpdatesChannel) await db.guild.setPublicUpdatesChannel(await db.oldGuild.publicUpdatesChannel).catch(() => {});
            if (await db.oldGuild?.defaultMessageNotifications !== undefined) await db.guild.setDefaultMessageNotifications(await db.oldGuild.defaultMessageNotifications).catch(() => {});
            if (await db.oldGuild?.afkChannel) await db.guild.setAFKChannel(await db.oldGuild.afkChannel).catch(() => {});
            if (await db.oldGuild?.afkTimeout !== undefined) await db.guild.setAFKTimeout(await db.oldGuild.afkTimeout).catch(() => {});
        } catch {}

        if (punish === "ban") {
            const rsl = await executor.ban({ reason: `Antiraid | Modification du serveur` }).catch(() => { });
            if (rsl) user_punish = true;
        } else if (punish === "kick") {
            const rsl = await executor.kick(`Antiraid | Modification du serveur`).catch(() => { });
            if (rsl) user_punish = true;
        } else if (punish === "derank") {
            const rsl = await executor.roles.set([], `Antiraid | Modification du serveur`).catch(() => { });
            if (rsl) user_punish = true;
        }

        if (user_punish) return logs(obj2);
        else return logs(obj3);
    }
}


