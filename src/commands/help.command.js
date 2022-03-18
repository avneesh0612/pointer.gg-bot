const Discord = require("discord.js");
const Command = require("../structures/command.structure.js");
const theme = require("../data/theme.data.js");

module.exports = new Command({
  name: "help",
  aliases: [],
  description: "🦄 Shows the list of all the commands.",

  async run(msg) {
    const embed = new Discord.MessageEmbed()
      .setColor(theme["blurple"])
      .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
      .setDescription(
        `Hey 👋! This is the faucet bot for pointer.gg.\n
        **Commands**:\n`
      );

    msg.client.commands.forEach(command => {
      embed.addField(
        `\n\`${process.env.PREFIX}${command.name}\``,
        `${command.description}`
      );
    });

    msg.reply({ embeds: [embed] });
  },
});
