const httpsUrl = (network) => {
  if (network === "rinkeby") {
    return process.env.ALCHEMY_API_URL_RINKEBY;
  } else if (network === "mumbai") {
    return process.env.ALCHEMY_API_URL;
  }
};

module.exports = httpsUrl;
