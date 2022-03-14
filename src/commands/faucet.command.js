const Command = require("../structures/command.structure.js");
const Web3 = require("web3");
const Tx = require('ethereumjs-tx');


module.exports = new Command({
  name: "faucet",
  aliases: [],
  description: "Faucet huh.",

  async run(msg, args, client) {


    await msg.reply(`This is my bruh faucet!`);
  },
});
