const networks = ["mumbai", "rinkeby"];

const networkDescription = new Map([
  ["mumbai", "Polygon mumbai is the testnet used for testing and development on the Polygon blockchain."],
  ["rinkeby", "Rinkeby is the testnet used for testing and development on the Ethereum blockchain."],
]);

const networkAmount = new Map([
  ["mumbai", "1"],
  ["rinkeby", "0.1"],
]);

const networkCurrency = new Map([
  ["mumbai", "MATIC"],
  ["rinkeby", "ETH"],
]);

const networkBlockchainExplorer = new Map([
  ["mumbai", "PolygonScan"],
  ["rinkeby", "EtherScan"],
]);

const networkReqs = 3;

const txUrl = new Map([
  ["mumbai", "https://mumbai.polygonscan.com/tx"],
  ["rinkeby", "https://rinkeby.etherscan.io/tx"],
]);

const networkAddressUrl = new Map([
  ["mumbai", "https://mumbai.polygonscan.com/address"],
  ["rinkeby", "https://rinkeby.etherscan.io/address"]
])

const networkAddressApiUrl = new Map([
  ["mumbai", "https://api-testnet.polygonscan.com/api?module=account&action=balance"],
  ["rinkeby", "https://api-rinkeby.etherscan.io/api?module=account&action=balance"]
])


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
  networkEmojis,
  networkCurrency,
  networkBlockchainExplorer,
  networkDescription
};
