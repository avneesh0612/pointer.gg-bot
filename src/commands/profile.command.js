const ethers = require("ethers");

const Command = require("../structures/command.structure.js");

const {
  wrongSyntaxEmbed, notSupportedNetworkEmbed, invalidAddressEmbed
} = require("../utils/embeds.utils.js");

const { networks, networkAddressUrl } = require("../data/network.data.js");

module.exports = new Command({
  name: "profile",
  aliases: [],
  description: "🌈 Gives the user profile link on that network.",
  usage: `${process.env.PREFIX}profile <address> <network>`,

  async run(msg, args) {
    if (args.length < 3) {
      msg.reply({ embeds: [wrongSyntaxEmbed("profile")] });
    } else if (args.length > 3) {
      msg.reply({ embeds: [wrongSyntaxEmbed("profile")] });
    } else {
      const address = args[1].toLowerCase();
      const network = args[2].toLowerCase();

      if (!networks.includes(network)) {
        msg.reply({ embeds: [notSupportedNetworkEmbed(network)] });
      } else {
        if (ethers.utils.isAddress(address)) {
          msg.reply(`${networkAddressUrl.get(network)}/${address}`);
        } else {
          msg.reply({ embeds: [invalidAddressEmbed(address)] });
        }
      }
    }
  },
});
