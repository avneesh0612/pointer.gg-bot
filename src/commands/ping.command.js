const Command = require("../structures/command.structure.js");

module.exports = new Command({
  name: "ping",
  aliases: [],
  description: "🏓 Shows the ping of the bot.",

  async run(msg) {
    const message = await msg.reply(`Pong: ${msg.client.ws.ping} ms!`);
    message.edit(
      `Pong: **${msg.client.ws.ping} ms!**\nMessage Ping: **${message.createdTimestamp - msg.createdTimestamp
      } ms!**`
    );
  },
});
