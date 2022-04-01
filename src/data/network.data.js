// List of all the supported networks for the faucet
const networks = ["mumbai", "rinkeby"];

const txUrl = new Map([
  ["mumbai", "https://mumbai.polygonscan.com/tx"],
  ["rinkeby", "https://rinkeby.etherscan.io/tx"],
]);

// The number of tokens which are to be sent to the user on a specific network
const networkAmount = new Map([
  ["mumbai", "1"],
  ["rinkeby", "0.1"],
]);

const networkAddressUrl = new Map([
  ["mumbai", "https://mumbai.polygonscan.com/address"],
  ["rinkeby", "https://rinkeby.etherscan.io/address"]
])

// The API url for fetching the number of tokens the user has on a specific network
const networkAddressApiUrl = new Map([
  ["mumbai", "https://api-testnet.polygonscan.com/api?module=account&action=balance"],
  ["rinkeby", "https://api-rinkeby.etherscan.io/api?module=account&action=balance"]
])

// The amount of requests a user can make using the faucet bot lifetime
const networkReqs = 3;

// Emojis related to the network 👀
const networkEmojis = new Map([
  ["mumbai", "💜"],
  ["rinkeby", "💛"],
])

module.exports = {
  networks,
  txUrl,
  networkAmount,
  networkAddressUrl,
  networkAddressApiUrl,
  networkReqs,
  networkEmojis
};
