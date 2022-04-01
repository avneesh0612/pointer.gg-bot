const { txUrl } = require("../data/network.data.js");

const txUrlStart = (network) => {
  if (network === "rinkeby") {
    return txUrl.get("rinkeby");
  } else if (network === "mumbai") {
    return txUrl.get("mumbai");
  }
};

module.exports = txUrlStart;
