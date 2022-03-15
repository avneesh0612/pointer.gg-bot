const Discord = require("discord.js");
const Command = require("../structures/command.structure.js");
const theme = require("../data/theme.data.js");

module.exports = new Command({
  name: "help",
  aliases: [],
  description: "Shows detailed information about the bot.",

  async run(msg) {
    const embed = new Discord.MessageEmbed()
      .setColor(theme["blurple"])
      .setDescription(
        `Hey! This is a faucet bot for Pointer.gg. Use the \`-faucet\` command to get funds! The command goes like this- \`-config <wallet-address> <network-name>\`.\nFor example: \`-faucet matic mumbai\``
      );

    msg.reply({ embeds: [embed] });
  },
});
