const chainId = (network) => {
  if (network === "rinkeby") {
    return 4;
  } else if (network === "polygon") {
    return 80001;
  } else {
    return 80001;
  }
};

module.exports = chainId;
