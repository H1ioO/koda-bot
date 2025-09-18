const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions
	],
	partials: [
		Partials.User,
		Partials.Channel,
		Partials.GuildMember,
		Partials.Message,
		Partials.Reaction
	]
});
const { readdirSync } = require('fs');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

 process.on("unhandledRejection", err => {console.log(err);})

client.db = db;
client.config = require('./config.js');
client.commands = new Collection()
client.aliases = new Collection()


const loadCommands = (dir = "./cmd/") => {
	readdirSync(dir).forEach(dirs => {
		const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
		for (const file of commands) {
			const getFileName = require(`${dir}/${dirs}/${file}`);
			client.commands.set(getFileName.name, getFileName);
			console.log(`> commande charger ${getFileName.name} [${dirs}]`)
		};
	});
};

const loadEvents = (dir = "./events/") => {
	readdirSync(dir).forEach(dirs => {
		const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
		for (const event of events) {
			const evt = require(`${dir}/${dirs}/${event}`);
			const evtName = event.split(".")[0];
			client.on(evtName, evt.bind(null, client, db));
			console.log(`> event charger ${evtName}`)
		};
	});
};

loadEvents();
loadCommands();


client.login(client.config.token);