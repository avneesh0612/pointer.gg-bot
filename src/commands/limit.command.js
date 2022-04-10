const Discord = require("discord.js");

const Command = require("../structures/command.structure.js");

const User = require("../models/user.model.js");
const theme = require("../data/theme.data.js");

const { networks, networkEmojis } = require("../data/network.data.js");
const constants = require("../data/constants.data.js");

module.exports = new Command({
  name: "limit",
  aliases: [],
  description: "👀 Check you faucet request limit.",
  usage: `${process.env.PREFIX}limit`,

  async run(msg) {
    const response = await User.findOne({ id: msg.author.id });

    if (response === null) {
      const embed = new Discord.MessageEmbed()
        .setColor(theme["error"])
        .setFooter({ text: constants["footerText"] })
        .setDescription(
          "😿 You haven't used the faucet yet. use the `-faucet` command to access the faucet"
        );

      msg.reply({ embeds: [embed] });
    } else {
      const embed = new Discord.MessageEmbed()
        .setColor(theme["success"])
        .setDescription(
          `✨ Here are the faucet requests limit for each network for you account:`
        )
        .setFooter({ text: constants["footerText"] });

      networks.map((network) => {
        embed.addField(
          `${networkEmojis.get(network)} ${network.replace(/./, (c) =>
            c.toUpperCase()
          )}`,
          String(response[`${network}Reqs`])
        );
      });

      msg.reply({ embeds: [embed] });
    }
  },
});

