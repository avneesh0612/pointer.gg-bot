const Command = require("../structures/command.structure.js");

module.exports = new Command({
  name: "ping",
  aliases: [],
  description: "🏓 Shows the ping of the bot.",
  usage: `${process.env.PREFIX}ping`,

  async run(msg) {
    const message = await msg.reply(`Pong: ${msg.client.ws.ping} ms!`);
    message.edit(
      `🏓 pong: **${msg.client.ws.ping} ms!**\nmessage ping: **${message.createdTimestamp - msg.createdTimestamp
      } ms!**`
    );
  },
});
