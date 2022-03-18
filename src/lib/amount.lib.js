const { networkAmount } = require("../data/network.data.js");

const amount = (network) => {
  if (network === "rinkeby") {
    return networkAmount.get("rinkeby");
  } else if (network === "polygon") {
    return networkAmount.get("polygon");
  }
};

module.exports = amount;
