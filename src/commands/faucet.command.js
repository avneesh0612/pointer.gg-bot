const Command = require("../structures/command.structure.js");
const ethers = require("ethers");
const dotenv = require("dotenv");
const Discord = require("discord.js");
const networkData = require("../data/network.data.js");

const theme = require("../data/theme.data");
dotenv.config();

const privateKey = process.env.PRIVATE_KEY.toString("hex");
const wallet = new ethers.Wallet(privateKey);

module.exports = new Command({
  name: "faucet",
  aliases: [],
  description: "Faucet huh.",

  async run(msg, args) {
    if (args.length < 3) {
      const embed = new Discord.MessageEmbed()
        .setColor(theme["error"])
        .setDescription(
          `Hey! The command argument syntax is a bit wrong. Here is the correct argument syntax for this command \`-faucet <your-address> <network-name>\`.\nFor example: \`-faucet 0x6bF08768995E7430184a48e96940B83C15c1653f mumbai\``
        );

      msg.reply({ embeds: [embed] });
    } else if (args.length > 3) {
      const embed = new Discord.MessageEmbed()
        .setColor(theme["error"])
        .setDescription(
          `Hey! The command argument syntax is a bit wrong. Here is the correct argument syntax for this command \`-faucet <your-address> <network-name>\`.\nFor example: \`-faucet 0x6bF08768995E7430184a48e96940B83C15c1653f mumbai\``
        );

      msg.reply({ embeds: [embed] });
    } else {
      let addressArg = args[1]?.toLowerCase();
      let networkArg = args[2]?.toLowerCase();

      if (!addressArg) {
        const embed = new Discord.MessageEmbed()
          .setColor(theme["error"])
          .setDescription(
            `Hey! The command argument syntax is a bit wrong. Here is the correct argument syntax for this command \`-faucet <your-address> <network-name>\`.\nFor example: \`-faucet 0x6bF08768995E7430184a48e96940B83C15c1653f mumbai\``
          );

        msg.reply({ embeds: [embed] });
      } else if (!networkArg) {
        const embed = new Discord.MessageEmbed()
          .setColor(theme["error"])
          .setDescription(
            `Hey! The command argument syntax is a bit wrong. Here is the correct argument syntax for this command \`-faucet <your-address> <network-name>\`.\nFor example: \`-faucet 0x6bF08768995E7430184a48e96940B83C15c1653f mumbai\``
          );

        msg.reply({ embeds: [embed] });
      } else {
        if (!networkData.includes(networkArg)) {
          const embed = new Discord.MessageEmbed()
            .setColor(theme["error"])
            .setDescription(
              `We currently don't support \`${networkArg}\` network`
            );
          msg.reply({ embeds: [embed] });
        }
      }
    }

    const addressTo = args[1]?.toLowerCase();
    const network = args[2]?.toLowerCase();

    const address = wallet.address;

    const httpsUrl = () => {
      if (network === "rinkeby") {
        return process.env.ALCHEMY_API_URL_RINKEBY;
      } else if (network === "mumbai") {
        return process.env.ALCHEMY_API_URL;
      }
    };

    const init = async function () {
      const httpsProvider = new ethers.getDefaultProvider(httpsUrl());
      let nonce = await httpsProvider.getTransactionCount(address);
      let feeData = await httpsProvider.getFeeData();

      const chainId = () => {
        if (network === "rinkeby") {
          return 4;
        } else if (network === "mumbai") {
          return 80001;
        } else {
          return 80001;
        }
      };

      const txUrlStart = () => {
        if (network === "rinkeby") {
          return "https://rinkeby.etherscan.io/tx";
        } else if (network === "mumbai") {
          return "https://mumbai.polygonscan.com/tx";
        }
      };
      const amount = () => {
        if (network === "rinkeby") {
          return "0.1";
        } else if (network === "mumbai") {
          return "1";
        }
      };

      const tx = {
        type: 2,
        nonce: nonce,
        to: addressTo,
        maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"],
        maxFeePerGas: feeData["maxFeePerGas"],
        value: ethers.utils.parseEther(amount()),
        gasLimit: "21000",
        chainId: chainId(),
      };

      const signedTx = await wallet.signTransaction(tx);

      const txHash = ethers.utils.keccak256(signedTx);
      console.log("Precomputed txHash:", txHash);

      const embed = new Discord.MessageEmbed()
        .setColor(theme["success"])
        .setDescription(
          `Hey! ${
            network === "rinkeby" ? "0.01 eth" : "1 matic"
          } has been sent to your account. You can view the transaction on [${
            network === "rinkeby" ? "EtherScan" : "PolygonScan"
          }](${txUrlStart()}/${txHash})`
        );

      await msg.reply({ embeds: [embed] });
      httpsProvider.sendTransaction(signedTx).then(console.log);
    };
    init();
  },
});
