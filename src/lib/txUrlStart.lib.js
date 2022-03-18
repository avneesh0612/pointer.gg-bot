const { txUrl } = require("../data/network.data.js");

const txUrlStart = (network) => {
  if (network === "rinkeby") {
    return txUrl.get("rinkeby");
  } else if (network === "polygon") {
    return txUrl.get("polygon");
  }
};

module.exports = txUrlStart;
