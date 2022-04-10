const Discord = require("discord.js");

const Command = require("../structures/command.structure.js");

const theme = require("../data/theme.data.js");
const constants = require("../data/constants.data.js");

module.exports = new Command({
  name: "help",
  aliases: [],
  description: "🦄 Shows the list of all the commands.",
  usage: `${process.env.PREFIX}help`,

  async run(msg) {
    const embed = new Discord.MessageEmbed()
      .setColor(theme["blurple"])
      .setFooter({ text: constants["footerText"] })
      .setDescription(
        `Hey 👋! This is the faucet bot for pointer.gg.\n
        **Commands**:\n`
      );

    msg.client.commands.forEach((command) => {
      embed.addField(
        `\n\n${command.name}`,
        `${command.description}\n**Usage**: \`${command.usage}\``
      );
    });

    msg.reply({ embeds: [embed] });
  },
});
