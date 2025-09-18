const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ComponentType, ChannelSelectMenuBuilder, ChannelType } = require("discord.js");

module.exports = {
    name: "setup",
    aliases: ["antiraid"],
    description: "Configuration complète de l'antiraid",
    go: async (client, db, message, args, prefix, color) => {
        if (await db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
            const lgs = { name: "Logs", emoji: "1️⃣", type: 1, db: "logs" };
            const array1 = [
                { name: "Création de rôle", emoji: "2️⃣", db: "rolecreate" },
                { name: "Suppression de rôle", emoji: "3️⃣", db: "roledelete" },
                { name: "Modification de rôle", emoji: "4️⃣", db: "roleedit" },
                { name: "Ajout de rôle avec des permissions dangereuses", emoji: "5️⃣", db: "roleadd" },
            ]
            const array2 = [
                { name: "Création de salon", emoji: "2️⃣", db: "channelcreate" },
                { name: "Suppression de salon", emoji: "3️⃣", db: "channeldelete" },
                { name: "Modification de salon", emoji: "4️⃣", db: "channeledit" },
                { name: "Modification du serveur", emoji: "5️⃣", db: "update" },
            ]
            const array3 = [
                { name: "Création de webhook", emoji: "2️⃣", db: "webhook" },
                { name: "Ajout de bot", emoji: "3️⃣", db: "bot" },
                { name: "Bannissement/Expulsion de membre", emoji: "4️⃣", db: "ban" },
                { name: "Message contenant une invitation discord", emoji: "5️⃣", db: "pub", sanction: "exclusion 5m" },
            ];
            const array4 = [
                { name: "Multiplication de ping", emoji: "2️⃣", db: "ping", sanction: "exclusion 5m" },
                { name: "Multiplication de message", emoji: "3️⃣", db: "spam", sanction: "exclusion 5m" },
                { name: "Déconnexion de membre", emoji: "4️⃣", db: "deco" },
                { name: "Mettre en mute des membres", emoji: "5️⃣", db: "mute" },
            ];
            const tableau = [array1, array2, array3, array4];
            if (client.config.owner.includes(message.author.id) || await db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
                if (args[0] === "on") {
                    const msg = await message.reply({ content: `Chargement...`, allowedMentions: { repliedUser: false } });
                    tableau.forEach(async array => {
                        array.forEach(e => {
                            db.set(`${e.db}_${message.guild.id}`, true)
                            db.set(`${e.db}wl_${message.guild.id}`, null)
                            db.set(`${e.db}sanction_${message.guild.id}`, "derank")
                        });
                    });
                    msg.edit({ content: "Tout les évenements d'antiraid on été activé", allowedMentions: { repliedUser: false } });
                } else if (args[0] === "off") {
                    const msg = await message.reply({ content: `Chargement...`, allowedMentions: { repliedUser: false } });
                    tableau.forEach(async array => {
                        array.forEach(e => {
                            db.set(`${e.db}_${message.guild.id}`, null);
                        });
                    });
                    msg.edit({ content: "Tout les évenements d'antiraid on été désactivé", allowedMentions: { repliedUser: false } });
                } else if (args[0] === "max") {
                    const msg = await message.reply({ content: `Chargement...`, allowedMentions: { repliedUser: false } });
                    tableau.forEach(async array => {
                        array.forEach(e => {
                            db.set(`${e.db}_${message.guild.id}`, true);
                            db.set(`${e.db}wl_${message.guild.id}`, true);
                            db.set(`${e.db}sanction_${message.guild.id}`, "ban");
                        });
                    });
                    msg.edit({ content: "Tout les évenements d'antiraid on été activé en `max`", allowedMentions: { repliedUser: false } });
                } else if (args[0] === "config" || !args[0]) {
                    const msg = await message.reply({ content: `Chargement...`, allowedMentions: { repliedUser: false } });
                    await page1()
                    setTimeout(() => {
                        message.delete();
                        return msg.delete();
                    }, 60000 * 10);
                    const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 * 10 });
                    collector.on("collect", async i => {
                        if (i.user.id !== message.author.id) return;
                        await i.deferUpdate();
                        if (i.customId === "antiraid4_" + message.id) {
                            page4()
                        }
                        if (i.customId === "antiraid3_" + message.id) {
                            page3()
                        }
                        if (i.customId === "antiraid2_" + message.id) {
                            page2()
                        }
                        if (i.customId === "antiraid1_" + message.id) {
                            page1()
                        }
                    });
                    const collector2 = msg.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 60000 * 10 });
                    collector2.on("collect", async (i) => {
                        if (i.user.id !== message.author.id) return;
                        const value = i.values[0];
                        await i.deferUpdate();
                        if (value === "Logs") {
                            const embed = new EmbedBuilder()
                                .setColor(color)
                                .setDescription(`Sélectionnez **le nouveau salon de logs** :`);
                            
                            const channelSelect = new ActionRowBuilder()
                                .addComponents(
                                    new ChannelSelectMenuBuilder()
                                        .setCustomId(`logs_channel_${message.id}`)
                                        .setPlaceholder('Sélectionner un salon')
                                        .addChannelTypes(ChannelType.GuildText)
                                );
                            
                            const logMsg = await i.channel.send({ 
                                embeds: [embed], 
                                components: [channelSelect] 
                            });
                            
                            const logCollector = logMsg.createMessageComponentCollector({ 
                                time: 60000 * 5 
                            });
                            
                            logCollector.on("collect", async (logInteraction) => {
                                if (logInteraction.user.id !== message.author.id) return;
                                await logInteraction.deferUpdate();
                                
                                if (logInteraction.customId === `logs_channel_${message.id}`) {
                                    const selectedChannel = logInteraction.values[0];
                                    await db.set(`${lgs.db}_${message.guild.id}`, selectedChannel);
                                    
                                    logMsg.delete().catch(() => {});
                                    page1();
                                }
                            });
                            
                            logCollector.on("end", () => {
                                logMsg.delete().catch(() => {});
                            });
                        }
                        tableau.forEach(async array => {
                            array.forEach(async e => {
                                if (value === e.name + "_" + message.id) {
                                    const menu = new ActionRowBuilder()
                                        .addComponents(new StringSelectMenuBuilder()
                                            .setCustomId(`${e.name}onoff_${message.id}`)
                                            .setPlaceholder("Activité")
                                            .addOptions(
                                                { label: `・ On `, value: e.name + "on_" + message.id, emoji: "✅", description: "Activer: " + e.name },
                                                { label: `・ Off `, value: e.name + "off_" + message.id, emoji: "❌", description: "Desactiver: " + e.name },
                                            ))
                                    const menu2 = new ActionRowBuilder()
                                        .addComponents(new StringSelectMenuBuilder()
                                            .setCustomId(`${e.name}wl_${message.id}`)
                                            .setPlaceholder("Whitelist Bypass")
                                            .addOptions(
                                                { label: `・ WhitelistBypass On `, value: e.name + "wla_" + message.id, emoji: "👤", description: "Activer la whitelist bypass pour: " + e.name },
                                                { label: `・ WhitelistBypass Off `, value: e.name + "wld_" + message.id, emoji: "👥", description: "Desactiver la whitelist bypass pour: " + e.name },
                                            ))
                                    const menu3 = new ActionRowBuilder()
                                        .addComponents(new StringSelectMenuBuilder()
                                            .setCustomId(`${e.name}sanction_${message.id}`)
                                            .setPlaceholder("Sanctions")
                                            .addOptions(
                                                { label: `・ Derank `, value: e.name + "derank_" + message.id, emoji: "👤", description: "Définir la sanction derank pour: " + e.name },
                                                { label: `・ Kick `, value: e.name + "kick_" + message.id, emoji: "⚡", description: "Définir la sanction kick pour: " + e.name },
                                                { label: `・ Ban `, value: e.name + "ban_" + message.id, emoji: "🔌", description: "Définir la sanction ban pour: " + e.name },
                                            ))
                                    const btn = new ActionRowBuilder()
                                        .addComponents(new ButtonBuilder()
                                            .setCustomId(e.name + "yes_" + message.id)
                                            .setEmoji("✅")
                                            .setStyle(ButtonStyle.Success))
                                        .addComponents(new ButtonBuilder()
                                            .setCustomId(e.name + "non_" + message.id)
                                            .setEmoji("✖")
                                            .setStyle(ButtonStyle.Danger))
                                    const embed = new EmbedBuilder()
                                        .setTitle(`${e.emoji} ・ ${e.name}`)
                                        .setDescription("Configuration de l'événement antiraid")
                                        .setTimestamp()
                                        .setThumbnail(client.user.displayAvatarURL())
                                        .setFooter({ text: "Configuration antiraid", iconURL: message.author.displayAvatarURL() })
                                        .setColor(color)
                                    let msg2;
                                    if (e.sanction) msg2 = await i.channel.send({ embeds: [embed], components: [menu, menu2, btn] });
                                    else msg2 = await i.channel.send({ embeds: [embed], components: [menu, menu2, menu3, btn] });
                                    const collector4 = msg2.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 60000 * 10 });
                                    collector4.on("collect", async (i2) => {
                                        if (i2.user.id !== message.author.id) return;
                                        const value2 = i2.values[0];
                                        await i2.deferUpdate();
                                        if (value2 === e.name + "on_" + message.id) {
                                            await db.set(`tempevent_${e.name}_${message.id}`, true)
                                        };
                                        if (value2 === e.name + "off_" + message.id) {
                                            await db.set(`tempevent_${e.name}_${message.id}`, null)
                                        };
                                        if (value2 === e.name + "wla_" + message.id) {
                                            await db.set(`tempwl_${e.name}_${message.id}`, null)
                                        };
                                        if (value2 === e.name + "wld_" + message.id) {
                                            await db.set(`tempwl_${e.name}_${message.id}`, true)
                                        };
                                        if (value2 === e.name + "derank_" + message.id) {
                                            await db.set(`temppunish_${e.name}_${message.id}`, "derank")
                                        };
                                        if (value2 === e.name + "kick_" + message.id) {
                                            await db.set(`temppunish_${e.name}_${message.id}`, "kick")
                                        };
                                        if (value2 === e.name + "ban_" + message.id) {
                                            await db.set(`temppunish_${e.name}_${message.id}`, "ban")
                                        };
                                    });
                                    const collector3 = msg2.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 * 10 });
                                    collector3.on("collect", async (i2) => {
                                        if (i2.user.id !== message.author.id) return;
                                        await i2.deferUpdate();
                                        if (i2.customId === e.name + "yes_" + message.id) {
                                            const wl = await db.get(`tempwl_${e.name}_${message.id}`) || null;
                                            const punish = await db.get(`temppunish_${e.name}_${message.id}`) || null;
                                            const evt = await db.get(`tempevent_${e.name}_${message.id}`) || null;

                                            if (wl) await db.set(`${e.db}wl_${message.guild.id}`, wl);
                                            if (punish) await db.set(`${e.db}sanction_${message.guild.id}`, punish);
                                            if (evt) await db.set(`${e.db}_${message.guild.id}`, evt);
                                            await db.delete(`tempevent_${e.name}_${message.id}`)
                                            await db.delete(`temppunish_${e.name}_${message.id}`)
                                            await db.delete(`tempwl_${e.name}_${message.id}`)
                                            msg2.delete();
                                            array1.forEach(i => {
                                                if (i.name === e.name) return page1()
                                            });
                                            array2.forEach(i => {
                                                if (i.name === e.name) return page2()
                                            });
                                            array3.forEach(i => {
                                                if (i.name === e.name) return page3()
                                            });
                                            array4.forEach(i => {
                                                if (i.name === e.name) return page4()
                                            });
                                        };
                                        if (i2.customId === e.name + "non_" + message.id) {
                                            await db.delete(`tempevent_${e.name}_${message.id}`)
                                            await db.delete(`temppunish_${e.name}_${message.id}`)
                                            await db.delete(`tempwl_${e.name}_${message.id}`)
                                            msg2.delete();
                                        };
                                    });
                                }
                            });
                        });
                    });


                    function all(e) {
                        const event1 = onoff(db.get(`${e.db}_${message.guild.id}`));
                        const event2 = e.sanction ? e.sanction : db.get(`${e.db}sanction_${message.guild.id}`) === null ? "kick" : db.get(`${e.db}sanction_${message.guild.id}`);
                        const event3 = onoff(!db.get(`${e.db}wl_${message.guild.id}`) ? true : false);
                        return `Actif: \`${event1}\`\nSanction: \`${event2}\`\nWhitelist bypass: \`${event3}\``
                    };

                    function logs(name) {
                        const logs = message.guild.channels.cache.get(db.get(`${name}_${message.guild.id}`))
                        if (!logs) return "`🔴`";
                        else return `<#${logs.id}>`
                    };

                    function onoff(antiraid) {
                        if (!antiraid) return "`🔴`";
                        if (antiraid) return "`🟢`";
                    };

                    async function page1() {
                        let array_menu = [];
                        let array_filds = [];
                        array_filds.push({ name: `${lgs.emoji} ・ ${lgs.name} `, value: `Salon: ${logs(lgs.db)} ` });
                        array_menu.push({ label: `・ ${lgs.name}`, value: lgs.name, emoji: lgs.emoji, description: "Configuration de l'événement antiraid pour " + lgs.name });
                        array1.forEach(async e => {
                            array_filds.push({ name: `${e.emoji} ・ ${e.name} `, value: `${all(e)} ` });
                            array_menu.push({ label: `・ ${e.name} `, value: e.name + "_" + message.id, emoji: e.emoji, description: "Configuration de l'événement antiraid pour " + e.name });
                        });
                        array_menu.push({ label: `・ Annuler `, value: "Annuler", emoji: "❌", description: "Annuler la configuration" });
                        const menu = new ActionRowBuilder()
                            .addComponents(new StringSelectMenuBuilder()
                                .setCustomId(`menu1_${message.id}`)
                                .setPlaceholder("Faites un choix")
                                .addOptions(array_menu));

                        const btn = new ActionRowBuilder()
                            .addComponents(new ButtonBuilder()
                                .setCustomId("antiraid4_" + message.id)
                                .setLabel("◀")
                                .setStyle(ButtonStyle.Primary))
                            .addComponents(new ButtonBuilder()
                                .setCustomId("antiraid2_" + message.id)
                                .setLabel("▶")
                                .setStyle(ButtonStyle.Primary));

                        const embed = new EmbedBuilder()
                            .setTitle(`Configuration des évenements d'antiraid`)
                            .setDescription("Configuration complète de l'antiraid")
                            .setTimestamp()
                            .setThumbnail(client.user.displayAvatarURL())
                            .setColor(color)
                            .addFields(array_filds)
                            .setFooter({ text: `1 / 4`, iconURL: message.author.displayAvatarURL() });
                        msg.edit({ content: null, allowedMentions: { repliedUser: false }, embeds: [embed], components: [menu, btn] });

                    }

                    async function page2() {
                        let array_menu = [];
                        let array_filds = [];
                        array_filds.push({ name: `${lgs.emoji} ・ ${lgs.name} `, value: `Salon: ${logs(lgs.db)} ` });
                        array_menu.push({ label: `・ ${lgs.name} `, value: lgs.name, emoji: lgs.emoji, description: "Configuration de l'événement antiraid pour " + lgs.name });
                        array2.forEach(async e => {
                            array_filds.push({ name: `${e.emoji} ・ ${e.name} `, value: `${all(e)} ` });
                            array_menu.push({ label: `・ ${e.name} `, value: e.name + "_" + message.id, emoji: e.emoji, description: "Configuration de l'événement antiraid pour " + e.name });
                        });
                        array_menu.push({ label: `・ Annuler `, value: "Annuler", emoji: "❌", description: "Annuler la configuration" });
                        const menu = new ActionRowBuilder()
                            .addComponents(new StringSelectMenuBuilder()
                                .setCustomId(`menu2_${message.id}`)
                                .setPlaceholder("Faites un choix")
                                .addOptions(array_menu))

                        const btn = new ActionRowBuilder()
                            .addComponents(new ButtonBuilder()
                                .setCustomId("antiraid1_" + message.id)
                                .setLabel("◀")
                                .setStyle(ButtonStyle.Primary))
                            .addComponents(new ButtonBuilder()
                                .setCustomId("antiraid3_" + message.id)
                                .setLabel("▶")
                                .setStyle(ButtonStyle.Primary));

                        const embed = new EmbedBuilder()
                            .setTitle(`Configuration des évenements d'antiraid`)
                            .setDescription("Configuration complète de l'antiraid")
                            .setTimestamp()
                            .setThumbnail(client.user.displayAvatarURL())
                            .setColor(color)
                            .addFields(array_filds)
                            .setFooter({ text: `2 / 4`, iconURL: message.author.displayAvatarURL() });
                        msg.edit({ content: null, allowedMentions: { repliedUser: false }, embeds: [embed], components: [menu, btn] });

                    }

                    async function page3() {
                        let array_menu = [];
                        let array_filds = [];
                        array_filds.push({ name: `${lgs.emoji} ・ ${lgs.name} `, value: `Salon: ${logs(lgs.db)} ` });
                        array_menu.push({ label: `・ ${lgs.name} `, value: lgs.name, emoji: lgs.emoji, description: "Configuration de l'événement antiraid pour " + lgs.name });
                        array3.forEach(async e => {
                            array_filds.push({ name: `${e.emoji} ・ ${e.name} `, value: `${all(e)} ` });
                            array_menu.push({ label: `・ ${e.name} `, value: e.name + "_" + message.id, emoji: e.emoji, description: "Configuration de l'événement antiraid pour " + e.name });
                        });
                        array_menu.push({ label: `・ Annuler `, value: "Annuler", emoji: "❌", description: "Annuler la configuration" });
                        const menu = new ActionRowBuilder()
                            .addComponents(new StringSelectMenuBuilder()
                                .setCustomId(`menu3_${message.id}`)
                                .setPlaceholder("Faites un choix")
                                .addOptions(array_menu));

                        const btn = new ActionRowBuilder()
                            .addComponents(new ButtonBuilder()
                                .setCustomId("antiraid2_" + message.id)
                                .setLabel("◀")
                                .setStyle(ButtonStyle.Primary))
                            .addComponents(new ButtonBuilder()
                                .setCustomId("antiraid4_" + message.id)
                                .setLabel("▶")
                                .setStyle(ButtonStyle.Primary));

                        const embed = new EmbedBuilder()
                            .setTitle(`Configuration des évenements d'antiraid`)
                            .setDescription("Configuration complète de l'antiraid")
                            .setTimestamp()
                            .setThumbnail(client.user.displayAvatarURL())
                            .setColor(color)
                            .addFields(array_filds)
                            .setFooter({ text: `3 / 4`, iconURL: message.author.displayAvatarURL() });
                        msg.edit({ content: null, allowedMentions: { repliedUser: false }, embeds: [embed], components: [menu, btn] });
                    }
                    async function page4() {
                        let array_menu = [];
                        let array_filds = [];
                        array_filds.push({ name: `${lgs.emoji} ・ ${lgs.name} `, value: `Salon: ${logs(lgs.db)} ` });
                        array_menu.push({ label: `・ ${lgs.name} `, value: lgs.name, emoji: lgs.emoji, description: "Configuration de l'événement antiraid pour " + lgs.name });
                        array4.forEach(async e => {
                            array_filds.push({ name: `${e.emoji} ・ ${e.name} `, value: `${all(e)} ` });
                            array_menu.push({ label: `・ ${e.name} `, value: e.name + "_" + message.id, emoji: e.emoji, description: "Configuration de l'événement antiraid pour " + e.name });
                        });
                        array_menu.push({ label: `・ Annuler `, value: "Annuler", emoji: "❌", description: "Annuler la configuration" });
                        const menu = new ActionRowBuilder()
                            .addComponents(new StringSelectMenuBuilder()
                                .setCustomId(`menu4_${message.id}`)
                                .setPlaceholder("Faites un choix")
                                .addOptions(array_menu))

                        const btn = new ActionRowBuilder()
                            .addComponents(new ButtonBuilder()
                                .setCustomId("antiraid3_" + message.id)
                                .setLabel("◀")
                                .setStyle(ButtonStyle.Primary))
                            .addComponents(new ButtonBuilder()
                                .setCustomId("antiraid1_" + message.id)
                                .setLabel("▶")
                                .setStyle(ButtonStyle.Primary));

                        const embed = new EmbedBuilder()
                            .setTitle(`Configuration des évenements d'antiraid`)
                            .setDescription("Configuration complète de l'antiraid")
                            .setTimestamp()
                            .setThumbnail(client.user.displayAvatarURL())
                            .setColor(color)
                            .addFields(array_filds)
                            .setFooter({ text: `4 / 4`, iconURL: message.author.displayAvatarURL() });
                        msg.edit({ content: null, allowedMentions: { repliedUser: false }, embeds: [embed], components: [menu, btn] });
                    }
                }
            }
        }
    }
}
