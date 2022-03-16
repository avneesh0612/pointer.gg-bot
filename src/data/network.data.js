const network = ["mumbai", "rinkeby"];

const txUrl = new Map([
  ["mumbai", "https://mumbai.polygonscan.com/tx"],
  ["rinkeby", "https://rinkeby.etherscan.io/tx"],
]);

const networkAmount = new Map([
  ["mumbai", "1"],
  ["rinkeby", "0.1"],
]);

module.exports = {
  network,
  txUrl,
  networkAmount,
};
