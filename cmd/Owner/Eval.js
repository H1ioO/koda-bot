const { inspect } = require('util');

module.exports = {
    name: 'eval',
    description: "Exécute du code JavaScript",
    aliases: [],
    go: async (client, db, message, args, prefix, color) => {
        if(client.config.owner[0] !== message.author.id) return;

        const content = message.content.split(" ").slice(1).join(" ");
        const result = new Promise((resolve) => resolve(eval(content)));

        return result.then((output) => {
            if (typeof output !== "string") {
                output = inspect(output, {
                    depth: 0
                });
            }
            
            if (output.includes(client.token)) {
                output = output.replace(client.token, "T0K3N");
            }
            message.channel.send({
                content: `\`\`\`js\n${output}\`\`\``
            });
        }).catch((err) => {
            err = err.toString();

            if (err.includes(client.token)) {
                err = err.replace(client.token, "T0K3N");
            }
            message.channel.send({
                content: `\`\`\`js\n${err}\`\`\``
            });
        });
    }
}
