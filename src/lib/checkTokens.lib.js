const axios = require("axios");
const dotenv = require("dotenv");
const {
  networks,
  networkAmount,
  networkAddressApiUrl,
} = require("../data/network.data.js");

dotenv.config();

const checkTokens = async (address, network) => {
  if (networks.includes(network)) {
    try {
      const res = await axios.get(
        `${networkAddressApiUrl.get(network)}&address=${address}&apiKey=${
          network === "rinkeby"
            ? process.env.RINKEBY_API_KEY
            : process.env.POLYGON_API_KEY
        }`
      );

      if (Number(res.data.result) / 1e18 > networkAmount.get(network) * 2) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    console.log(`${network} not there in networks`);
    return false;
  }
};

module.exports = checkTokens;
