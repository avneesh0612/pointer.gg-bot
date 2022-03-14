const Command = require("../structures/command.structure.js");
require("log-timestamp");
const ethers = require("ethers");
const dotenv = require("dotenv");
dotenv.config();

const privateKey = process.env.PRIVATE_KEY.toString("hex");
const wallet = new ethers.Wallet(privateKey);

module.exports = new Command({
  name: "faucet",
  aliases: [],
  description: "Faucet huh.",

  async run(msg, args, client) {
    const address = wallet.address;
    console.log(args);

    const httpsUrl = process.env.ALCHEMY_API_URL;

    const init = async function () {
      const httpsProvider = new ethers.getDefaultProvider(httpsUrl);

      let nonce = await httpsProvider.getTransactionCount(address);

      let feeData = await httpsProvider.getFeeData();

      const tx = {
        type: 2,
        nonce: nonce,
        to: args[1],
        maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"],
        maxFeePerGas: feeData["maxFeePerGas"],
        value: ethers.utils.parseEther("1"),
        gasLimit: "21000",
        chainId: 80001,
      };

      const signedTx = await wallet.signTransaction(tx);

      const txHash = ethers.utils.keccak256(signedTx);
      console.log("Precomputed txHash:", txHash);
      await msg.reply(`https://mumbai.polygonscan.com/tx/${txHash}`);
      httpsProvider.sendTransaction(signedTx).then(console.log);
    };

    init();
  },
});
