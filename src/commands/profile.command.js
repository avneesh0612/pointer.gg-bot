const Discord = require("discord.js");
const ethers = require('ethers')

const Command = require("../structures/command.structure.js");
const errorEmbed = require("../lib/errorEmbed.lib.js")
const { networks, networkAddressUrl } = require("../data/network.data.js");
const theme = require("../data/theme.data.js");

module.exports = new Command({
  name: "profile",
  aliases: [],
  description: "🌈 Gives the user profile link on that network.",

  async run(msg, args) {

    if (args.length < 3) {
      msg.reply({ embeds: [errorEmbed('address')] });
    }
    else if (args.length > 3) {
      msg.reply({ embeds: [errorEmbed('address')] });
    }
    else {
      const address = args[1].toLowerCase();
      const network = args[2].toLowerCase();

      if (!networks.includes(network)) {
        const embed = new Discord.MessageEmbed()
          .setColor(theme["error"])
          .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
          .setDescription(
            `We currently don't support \`${network}\` network`
          );

        msg.reply({ embeds: [embed] });
      }
      else {
        if (ethers.utils.isAddress(address)) {
          msg.reply(`${networkAddressUrl.get(network)}/${address}`);
        }
        else {
          const embed = new Discord.MessageEmbed()
            .setColor(theme["error"])
            .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
            .setDescription(`The address argument isn't a valid address`);

          msg.reply({ embeds: [embed] });
        }
      }
    }
  }
});
