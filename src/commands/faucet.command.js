const ethers = require("ethers");
const dotenv = require("dotenv");
const Web3 = require("web3");

const Command = require("../structures/command.structure.js");
const User = require("../models/user.model.js");

const {
  notSupportedNetworkEmbed, invalidAddressEmbed, insufficientFundsEmbed, maxReqReachedEmbed, madeReqToAlchemyEmbed, sentTokensEmbed, txnErrorEmbed, wrongSyntaxEmbed,
} = require("../utils/embeds.utils.js");
const httpsUrl = require("../utils/httpsUrl.utils.js");
const chainId = require("../utils/chainId.utils.js");
const amount = require("../utils/amount.utils.js");

const { networks, networkReqs } = require("../data/network.data.js");
const constants = require("../data/constants.data.js");

dotenv.config();

const privateKey = process.env.PRIVATE_KEY.toString("hex");
const wallet = new ethers.Wallet(privateKey);

module.exports = new Command({
  name: "faucet",
  aliases: [],
  description: "🧱 Get testnet tokens by using faucet command.",
  usage: `${process.env.PREFIX}faucet <address> <network>`,

  async run(msg, args) {
    if (args.length < 3) {
      msg.reply({ embeds: [wrongSyntaxEmbed("faucet")] });
    } else if (args.length > 3) {
      msg.reply({ embeds: [wrongSyntaxEmbed("faucet")] });
    } else {
      let addressArg = args[1]?.toLowerCase();
      let networkArg = args[2]?.toLowerCase();

      if (!addressArg) {
        msg.reply({ embeds: [wrongSyntaxEmbed("faucet")] });
      } else if (!networkArg) {
        msg.reply({ embeds: [wrongSyntaxEmbed("faucet")] });
      } else {
        if (!networks.includes(networkArg)) {
          msg.reply({ embeds: [notSupportedNetworkEmbed(networkArg)] });
        } else {
          if (!ethers.utils.isAddress(addressArg)) {
            msg.reply({ embeds: [invalidAddressEmbed(addressArg)] });
            return
          }

          const httpsUrlWeb3 = httpsUrl(String(networkArg));
          var web3 = new Web3(new Web3.providers.HttpProvider(httpsUrlWeb3));

          const balance = web3.utils.fromWei(
            await web3.eth.getBalance(constants["fromAddress"]),
            "ether"
          );

          if (balance < amount(networkArg)) {
            msg.reply({ embeds: [insufficientFundsEmbed()] });
            return
          } else {
            const address = wallet.address;

            httpsUrl();

            const init = async function () {
              const httpsProvider = new ethers.getDefaultProvider(
                httpsUrl(networkArg)
              );
              let nonce = await httpsProvider.getTransactionCount(address);
              let feeData = await httpsProvider.getFeeData();

              const tx = {
                type: 2,
                nonce: nonce,
                to: addressArg,
                maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"],
                maxFeePerGas: feeData["maxFeePerGas"],
                value: ethers.utils.parseEther(amount(networkArg)),
                gasLimit: "21000",
                chainId: chainId(networkArg),
              };

              const isInDatabase = await User.countDocuments(
                { id: msg.author.id },
                { limit: 1 }
              );

              if (isInDatabase === 0) {
                const newUser = new User({
                  id: msg.author.id,
                });

                await newUser.save();
              }

              const networkRequests = await User.findOne({
                id: msg.author.id,
              });

              if (networkRequests[`${networkArg}Reqs`] >= networkReqs) {
                msg.reply({ embeds: [maxReqReachedEmbed()] });
              } else {
                msg.reply({ embeds: [madeReqToAlchemyEmbed()] });
                try {

                  const signedTx = await wallet.signTransaction(tx);

                  const txHash = ethers.utils.keccak256(signedTx);
                  console.log("Precomputed txHash:", txHash);

                  httpsProvider.sendTransaction(signedTx).then(console.log);

                  await msg.reply({ embeds: [sentTokensEmbed(networkArg, txHash)] });

                  User.findOneAndUpdate(
                    { id: msg.author.id },
                    { $inc: { [`${networkArg}Reqs`]: 1 } },
                    { new: true },
                    (err) => {
                      if (err) {
                        console.log(err);
                      }
                    });
                } catch (err) {
                  console.log(err);

                  msg.reply({ embeds: [txnErrorEmbed()] });
                  return;
                }
              }
            }
            init();
          }
        }
      }
    }
  }
});
