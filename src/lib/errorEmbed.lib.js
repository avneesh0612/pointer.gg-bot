const Discord = require("discord.js");
const theme = require("../data/theme.data.js");

const errorEmbed = () => {
  const embed = new Discord.MessageEmbed()
    .setColor(theme["error"])
    .setDescription(
      `Hey! The command argument syntax is a bit wrong. Here is the correct argument syntax for this command \`-faucet <your-address> <network-name>\`.\nFor example: \`-faucet 0x6bF08768995E7430184a48e96940B83C15c1653f mumbai\``
    );

  return embed;
};

module.exports = errorEmbed;
