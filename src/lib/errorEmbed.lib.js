const Discord = require("discord.js");
const theme = require("../data/theme.data.js");

const errorEmbed = (commandName) => {
  const embed = new Discord.MessageEmbed()
    .setColor(theme["error"])
    .setDescription(
      `Hey! The command argument syntax is a bit wrong. Here is the correct argument syntax for this command \`${process.env.PREFIX}${commandName} <your-address> <network-name>\`.\nFor example: \`${process.env.PREFIX}${commandName} 0x6bF08768995E7430184a48e96940B83C15c1653f mumbai\``
    );

  return embed;
};

module.exports = errorEmbed;
