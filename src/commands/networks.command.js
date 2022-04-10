const Discord = require("discord.js");

const Command = require("../structures/command.structure.js");

const theme = require("../data/theme.data.js");

const {
  networks,
  networkEmojis,
  networkDescription
} = require('../data/network.data.js');

module.exports = new Command({
  name: "networks",
  aliases: ["supported-networks", "network-list"],
  description: "🎉 Shows the list of supported networks.",
  usage: `${process.env.PREFIX}networks`,

  async run(msg) {
    const embed = new Discord.MessageEmbed()
      .setColor(theme["blurple"])
      .setTitle("Supported Networks")

    networks.map((network) => {
      embed.addField(
        `${networkEmojis.get(network)} ${network.replace(/./, (c) =>
          c.toUpperCase()
        )}`,
        networkDescription.get(network)
      );
    });

    msg.reply({ embeds: [embed] });
  },
});
