const Command = require("../structures/command.structure.js");
const ethers = require("ethers");
const dotenv = require("dotenv");
dotenv.config();

const privateKey = process.env.PRIVATE_KEY.toString("hex");
const wallet = new ethers.Wallet(privateKey);

module.exports = new Command({
  name: "faucet",
  aliases: [],
  description: "Faucet huh.",

  async run(msg, args) {
    const addressTo = args[1];
    const network = args[2];

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
      await msg.reply(`${txUrlStart()}/${txHash}`);
      httpsProvider.sendTransaction(signedTx).then(console.log);
    };

    init();
  },
});
