const Discord = require("discord.js");

const Command = require("../structures/command.structure.js");
const network = require("../data/network.data.js");
const theme = require("../data/theme.data.js");
const crypto = require("../data/crypto.data.js");

module.exports = new Command({
  name: "config",
  aliases: [],
  description: "Shows the ping of the bot.",

  async run(msg, args) {
    if (args.length < 3) {
      const embed = new Discord.MessageEmbed()
        .setColor(theme["error"])
        .setDescription(
          `Hey! The command argument syntax is a bit wrong. Here is the correct argument syntax for this command \`-config <crypto-name> <network-name>\`.\nFor example: \`-config matic mumbai\``
        );

      msg.reply({ embeds: [embed] });
    } else if (args.length > 3) {
      const embed = new Discord.MessageEmbed()
        .setColor(theme["error"])
        .setDescription(
          `Hey! The command argument syntax is a bit wrong. Here is the correct argument syntax for this command \`-config <crypto-name> <network-name>\`.\nFor example: \`-config matic mumbai\``
        );

      msg.reply({ embeds: [embed] });
    } else {
      let cryptoArg = args[1].toLowerCase();
      let networkArg = args[2].toLowerCase();

      if (!cryptoArg) {
        const embed = new Discord.MessageEmbed()
          .setColor(theme["error"])
          .setDescription(
            `Hey! The command argument syntax is a bit wrong. Here is the correct argument syntax for this command \`-config <crypto-name> <network-name>\`.\nFor example: \`-config matic mumbai\``
          );

        msg.reply({ embeds: [embed] });
      } else if (!networkArg) {
        const embed = new Discord.MessageEmbed()
          .setColor(theme["error"])
          .setDescription(
            `Hey! The command argument syntax is a bit wrong. Here is the correct argument syntax for this command \`-config <crypto-name> <network-name>\`.\nFor example: \`-config matic mumbai\``
          );

        msg.reply({ embeds: [embed] });
      } else {
        if (!crypto.includes(cryptoArg)) {
          const embed = new Discord.MessageEmbed()
            .setColor(theme["error"])
            .setDescription(
              `We currently don't support \`${cryptoArg}\` cryptocurrency`
            );
          msg.reply({ embeds: [embed] });
        } else {
          if (networkArg !== network.get(cryptoArg)) {
            const embed = new Discord.MessageEmbed()
              .setColor(theme["error"])
              .setDescription(
                `We currently don't support \`${networkArg}\` network`
              );
            msg.reply({ embeds: [embed] });
          } else {
            const embed = new Discord.MessageEmbed()
              .setColor(theme["success"])
              .setDescription(
                `Successfully configured \`${cryptoArg}\` as the cryptocurrency and \`${networkArg}\` as the network.`
              );
            msg.reply({ embeds: [embed] });
          }
        }
      }
    }
  },
});
