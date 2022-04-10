const Discord = require('discord.js');
const dotenv = require('dotenv')

dotenv.config();

const txUrlStart = require('./txUrlStart.utils.js');

const {
  networkCurrency,
  networkBlockchainExplorer,
  networkAmount
} = require('../data/network.data.js');
const theme = require('../data/theme.data.js');
const constants = require('../data/constants.data.js');

const wrongSyntaxEmbed = () => {
  const embed = new Discord.MessageEmbed()
    .setColor(theme["error"])
    .setDescription(
      `👋 Hey! The command argument syntax is a bit wrong. use the \`${process.env.PREFIX}help\` command to check the usage of this command.`
    );

  return embed;
}

const notSupportedNetworkEmbed = (network) => {
  const embed = new Discord.MessageEmbed()
    .setColor(theme["error"])
    .setFooter({
      text: constants["footerText"],
    })
    .setDescription(
      `😿 We currently don't support \`${network}\` network`
    );

  return embed;
}

const invalidAddressEmbed = (address) => {
  const embed = new Discord.MessageEmbed()
    .setColor(theme["error"])
    .setFooter({
      text: constants["footerText"],
    })
    .setDescription(
      `🔨 Bonk! \`${address}\` is not a valid address`
    );

  return embed;
}

const insufficientFundsEmbed = () => {
  const embed = new Discord.MessageEmbed()
    .setColor(theme["error"])
    .setFooter({
      text: constants["footerText"],
    })
    .setDescription(
      `😿 I am out of funds, please wait until i get refilled or donate to me: ${constants["fromAddress"]}`
    );

  return embed;
}

const sufficientFundsEmbed = () => {
  const embed = new Discord.MessageEmbed()
    .setColor(theme["error"])
    .setFooter({
      text: constants["footerText"],
    })
    .setDescription(
      `👀 You already have enough tokens to pay the gas fees`
    );

  return embed
}

const maxReqReachedEmbed = () => {
  const embed = new Discord.MessageEmbed()
    .setColor(theme["error"])
    .setFooter({
      text: constants["footerText"],
    })
    .setDescription(
      `👀 You have reached the max amount of requests which can be done using this command`
    );

  return embed
}

const madeReqToAlchemyEmbed = () => {
  const embed = new Discord.MessageEmbed()
    .setColor(theme["success"])
    .setFooter({
      text: constants["footerText"],
    })
    .setDescription(
      `🌈 Made a request to the faucet. check the link to confirm whether the token has been successfully transferred or not.`
    );

  return embed
}

const sentTokensEmbed = (network, txHash) => {
  const embed = new Discord.MessageEmbed()
    .setColor(theme["success"])
    .setFooter({
      text: constants["footerText"],
    })
    .setDescription(
      `👋 Hey! ${networkAmount.get(network)} ${networkCurrency.get(network)} has been sent to your account. you can view the transaction on [${networkBlockchainExplorer.get(network)}](${txUrlStart(network)}/${txHash})`
    );

  return embed
}

const txnErrorEmbed = () => {
  const embed = new Discord.MessageEmbed()
    .setColor(theme["error"])
    .setFooter({
      text: constants["footerText"],
    })
    .setDescription(
      `😿 There was an error while transferring the tokens.`
    );

  return embed
}

const errorEmbed = (error) => {
  const embed = new Discord.MessageEmbed()
    .setColor(theme["error"])
    .setFooter({
      text: constants["footerText"],
    })
    .setDescription(
      `😿 Something went wrong\n${error}`
    );

  return embed
}

module.exports = {
  wrongSyntaxEmbed,
  notSupportedNetworkEmbed,
  invalidAddressEmbed,
  insufficientFundsEmbed,
  sufficientFundsEmbed,
  maxReqReachedEmbed,
  madeReqToAlchemyEmbed,
  sentTokensEmbed,
  txnErrorEmbed,
  errorEmbed
}