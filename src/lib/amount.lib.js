const { networkAmount } = require("../data/network.data.js");

const amount = (network) => {
  if (network === "rinkeby") {
    return networkAmount.get("rinkeby");
  } else if (network === "mumbai") {
    return networkAmount.get("mumbai");
  }
};

module.exports = amount