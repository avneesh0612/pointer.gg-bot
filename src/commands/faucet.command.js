const Discord = require("discord.js");
const ethers = require("ethers");
const dotenv = require("dotenv");
const Command = require("../structures/command.structure.js");
const errorEmbed = require("../lib/errorEmbed.lib.js");
const httpsUrl = require("../lib/httpsUrl.lib.js");
const chainId = require("../lib/chainId.lib.js");
const txUrlStart = require("../lib/txUrlStart.lib.js");
const amount = require("../lib/amount.lib.js");
const { network } = require("../data/network.data.js");
const theme = require("../data/theme.data.js");

dotenv.config();

const privateKey = process.env.PRIVATE_KEY.toString("hex");
const wallet = new ethers.Wallet(privateKey);

module.exports = new Command({
  name: "faucet",
  aliases: [],
  description: "Faucet command",

  async run(msg, args) {
    if (args.length < 3) {
      msg.reply({ embeds: [errorEmbed()] });
    } else if (args.length > 3) {
      msg.reply({ embeds: [errorEmbed()] });
    } else {
      let addressArg = args[1]?.toLowerCase();
      let networkArg = args[2]?.toLowerCase();

      if (!addressArg) {
        msg.reply({ embeds: [errorEmbed()] });
      } else if (!networkArg) {
        msg.reply({ embeds: [errorEmbed()] });
      } else {
        if (!network.includes(networkArg)) {
          const embed = new Discord.MessageEmbed()
            .setColor(theme["error"])
            .setDescription(
              `We currently don't support \`${networkArg}\` network`
            );
          msg.reply({ embeds: [embed] });
        } else {
          const addressTo = args[1]?.toLowerCase();
          const network = args[2]?.toLowerCase();

          const address = wallet.address;

          httpsUrl();

          const init = async function () {
            const httpsProvider = new ethers.getDefaultProvider(
              httpsUrl(network)
            );
            let nonce = await httpsProvider.getTransactionCount(address);
            let feeData = await httpsProvider.getFeeData();

            const tx = {
              type: 2,
              nonce: nonce,
              to: addressTo,
              maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"],
              maxFeePerGas: feeData["maxFeePerGas"],
              value: ethers.utils.parseEther(amount(network)),
              gasLimit: "21000",
              chainId: chainId(network),
            };

            const signedTx = await wallet.signTransaction(tx);

            const txHash = ethers.utils.keccak256(signedTx);
            console.log("Precomputed txHash:", txHash);

            const embed = new Discord.MessageEmbed()
              .setColor(theme["success"])
              .setDescription(
                `Hey! ${
                  network === "rinkeby" ? "0.1 ETH" : "1 MATIC"
                } has been sent to your account. You can view the transaction on [${
                  network === "rinkeby" ? "EtherScan" : "PolygonScan"
                }](${txUrlStart(network)}/${txHash})`
              );

            await msg.reply({ embeds: [embed] });
            httpsProvider.sendTransaction(signedTx).then(console.log);
          };
          init();
        }
      }
    }
  },
});
