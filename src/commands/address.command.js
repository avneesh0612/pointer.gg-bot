const Discord = require("discord.js");

const Command = require("../structures/command.structure.js");
const { networks } = require("../data/network.data.js");
const theme = require("../data/theme.data.js");

module.exports = new Command({
  name: "address",
  aliases: [],
  description: "shows url from address bruh",

  async run(msg, args) {
    const networkArg = args[1];
    const address = args[2];
    console.log(networks);

    if (!networks.includes(networkArg)) {
      const embed = new Discord.MessageEmbed()
        .setColor(theme["error"])
        .setDescription(`We currently don't support \`${networkArg}\` network`);
      msg.reply({ embeds: [embed] });
    }

    if (networkArg === "rinkeby") {
      msg.reply(`https://rinkeby.etherscan.io/address/${address}`);
    } else if (networkArg === "polygon") {
      msg.reply(`https://mumbai.polygonscan.com/address/${address}`);
    }
  },
});
