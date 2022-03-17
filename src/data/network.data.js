const networks = ["polygon", "rinkeby"];

const txUrl = new Map([
  ["polygon", "https://mumbai.polygonscan.com/tx"],
  ["rinkeby", "https://rinkeby.etherscan.io/tx"],
]);

const networkAmount = new Map([
  ["polygon", "1"],
  ["rinkeby", "0.1"],
]);

const networkAddressApiUrl = new Map([
  ["polygon", "https://api-testnet.polygonscan.com/api?module=account&action=balance"],
  ["rinkeby", "https://api-rinkeby.etherscan.io/api?module=account&action=balance"]
])

module.exports = {
  networks,
  txUrl,
  networkAmount,
  networkAddressApiUrl
};
