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
        `Hey! This is a faucet bot for Pointer.gg. Use the \`-faucet\` command to get funds! The command goes like this- \`-faucet <wallet-address> <network-name>\`.\nFor example: \`-faucet 0x6bF08768995E7430184a48e96940B83C15c1653f polygon\``
      );

    msg.reply({ embeds: [embed] });
  },
});
