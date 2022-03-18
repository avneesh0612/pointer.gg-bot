const Discord = require("discord.js");
const ethers = require("ethers");
const dotenv = require("dotenv");

const Command = require("../structures/command.structure.js");
const User = require("../models/user.model.js");

const httpsUrl = require("../lib/httpsUrl.lib.js");
const chainId = require("../lib/chainId.lib.js");
const txUrlStart = require("../lib/txUrlStart.lib.js");
const amount = require("../lib/amount.lib.js");
const checkTokens = require("../lib/checkTokens.lib.js");
const errorEmbed = require("../lib/errorEmbed.lib.js");
const { networks } = require("../data/network.data.js");
const theme = require("../data/theme.data.js");

dotenv.config();

const privateKey = process.env.PRIVATE_KEY.toString("hex");
const wallet = new ethers.Wallet(privateKey);

module.exports = new Command({
  name: "faucet",
  aliases: [],
  description: "🧱 Get testnet tokens by using faucet command.",

  async run(msg, args) {
    // Checking whether the command's argument syntax is proper or not
    if (args.length < 3) {
      msg.reply({ embeds: [errorEmbed('faucet')] });
    } else if (args.length > 3) {
      msg.reply({ embeds: [errorEmbed('faucet')] });
    } else {
      let addressArg = args[1]?.toLowerCase();
      let networkArg = args[2]?.toLowerCase();

      if (!addressArg) {
        msg.reply({ embeds: [errorEmbed('faucet')] });
      } else if (!networkArg) {
        msg.reply({ embeds: [errorEmbed('faucet')] });
      } else {
        // Checking if the network is supported or not
        if (!networks.includes(networkArg)) {
          const embed = new Discord.MessageEmbed()
            .setColor(theme["error"])
            .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
            .setDescription(
              `We currently don't support \`${networkArg}\` network`
            );

          msg.reply({ embeds: [embed] });
        } else {
          const addressTo = args[1]?.toLowerCase();
          const network = args[2]?.toLowerCase();

          if (!ethers.utils.isAddress(addressTo)) {
            const embed = new Discord.MessageEmbed()
              .setColor(theme["error"])
              .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
              .setDescription(`The address argument isn't a valid address`);

            msg.reply({ embeds: [embed] });
          }
          else {
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

              // 0 means that the user isn't there in the database and 1 means that the user is already there in the database
              const isInDatabase = await User.countDocuments({ id: msg.author.id }, { limit: 1 })

              if (isInDatabase === 0) {
                const newUser = new User({
                  id: msg.author.id
                });

                await newUser.save();

                // `checkTokens` check whether the user has enough tokens to pay the gas fees or not. If the user doesn't have enough tokens, then the tokens would be transferred and increment the network's request in the database

                console.log(checkTokens(addressTo, network));
                if (checkTokens(addressTo, network) === true) {
                  const embed = new Discord.MessageEmbed()
                    .setColor(theme["error"])
                    .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
                    .setDescription(`You already have enough tokens to pay the gas fees.`)

                  msg.reply({ embeds: [embed] });
                }
                else {
                  const networkRequests = await User.findOne({ id: msg.author.id })

                  // The faucet discord bot currently only provides a limit of 3 faucet requests per user.

                  if (networkRequests[`${network}Reqs`] >= 3) {
                    const embed = new Discord.MessageEmbed()
                      .setColor(theme["error"])
                      .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
                      .setDescription(`You have reached the maximum amount of requests.`)

                    msg.reply({ embeds: [embed] });
                  }
                  else {
                    // The `priorEmbed` is just the tell the user that the request has been sent to the faucet and the transaction is being processed.

                    const priorEmbed = new Discord.MessageEmbed()
                      .setColor(theme["success"])
                      .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
                      .setDescription(`Made a request to the faucet. Check the link to confirm whether the token has been successfully transferred or not.`)

                    msg.reply({ embeds: [priorEmbed] });

                    const signedTx = await wallet.signTransaction(tx);

                    const txHash = ethers.utils.keccak256(signedTx);
                    console.log("Precomputed txHash:", txHash);

                    httpsProvider.sendTransaction(signedTx).then(console.log);

                    const embed = new Discord.MessageEmbed()
                      .setColor(theme["success"])
                      .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
                      .setDescription(`Hey! ${network === "rinkeby" ? "0.1 ETH" : "1 MATIC"} has been sent to your account. You can view the transaction on [${network === "rinkeby" ? "EtherScan" : "PolygonScan"}](${txUrlStart(network)}/${txHash})`)

                    await msg.reply({ embeds: [embed] });

                    //  At the end of each successful, we would increment the value of the that network's request in the database.

                    User.findOneAndUpdate({ id: msg.author.id }, { $inc: { [`${network}Reqs`]: "1" } }, (err) => {
                      if (err) {
                        console.log(err);
                        const errorEmbed = new Discord.MessageEmbed()
                          .setColor(theme["error"])
                          .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
                          .setDescription(`Something went wrong.\n\n \`\`\`${err}\`\`\``)

                        msg.reply({ embeds: [errorEmbed] });
                      }
                    })
                  }
                }
              } else {
                if (checkTokens(addressTo, network) === true) {
                  const embed = new Discord.MessageEmbed()
                    .setColor(theme["error"])
                    .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
                    .setDescription(`You already have enough tokens to pay the gas fees.`)

                  msg.reply({ embeds: [embed] });
                }
                else {
                  const networkRequests = await User.findOne({ id: msg.author.id })

                  if (networkRequests[`${network}Reqs`] >= 3) {
                    const embed = new Discord.MessageEmbed()
                      .setColor(theme["error"])
                      .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
                      .setDescription(`You have reached the maximum amount of requests.`)

                    msg.reply({ embeds: [embed] });
                  }
                  else {
                    // The `priorEmbed` is just the tell the user that the request has been sent to the faucet and the transaction is being processed.

                    const priorEmbed = new Discord.MessageEmbed()
                      .setColor(theme["success"])
                      .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
                      .setDescription(`Made a request to the faucet. Check the link to confirm whether the token has been successfully transferred or not.`)

                    msg.reply({ embeds: [priorEmbed] });

                    const signedTx = await wallet.signTransaction(tx);

                    const txHash = ethers.utils.keccak256(signedTx);
                    console.log("Precomputed txHash:", txHash);

                    httpsProvider.sendTransaction(signedTx).then(console.log);

                    const embed = new Discord.MessageEmbed()
                      .setColor(theme["success"])
                      .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
                      .setDescription(`Hey! ${network === "rinkeby" ? "0.1 ETH" : "1 MATIC"} has been sent to your account. You can view the transaction on [${network === "rinkeby" ? "EtherScan" : "PolygonScan"}](${txUrlStart(network)}/${txHash})`)

                    await msg.reply({ embeds: [embed] });

                    // At the end of each successful, we would increment the value of the that network's request in the database.

                    User.findOneAndUpdate({ id: msg.author.id }, { $inc: { [`${network}Reqs`]: 1 } }, (err) => {
                      if (err) {
                        console.log(err);
                        const errorEmbed = new Discord.MessageEmbed()
                          .setColor(theme["error"])
                          .setFooter({ text: 'Made with ❤️ by @Kira.#3246 and @Avneesh#4961' })
                          .setDescription(`Something went wrong.\n\n${err}`)

                        msg.reply({ embeds: [errorEmbed] });
                      }
                    })
                  }
                }
              }
            }
            init();
          }
        }
      }
    }
  },
});
