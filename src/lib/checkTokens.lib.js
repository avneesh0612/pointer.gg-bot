const axios = require("axios");
const dotenv = require("dotenv");
const {
  networks,
  networkAmount,
  networkAddressApiUrl,
} = require("../data/network.data.js");

dotenv.config();

let responseData;

const checkTokens = async (address, network) => {
  if (networks.includes(network)) {
    await axios
      .get(
        `${networkAddressApiUrl.get(network)}&address=${address}&apiKey=${network === "rinkeby"
          ? process.env.RINKEBY_API_KEY
          : process.env.POLYGON_API_KEY
        }`
      )
      .then((res) => {
        responseData = res.data;
      });
  }
};

checkTokens("0x6bF08768995E7430184a48e96940B83C15c1653f", "mumbai");

const anotherFunction = async (network) => {
  Number(responseData?.result && responseData.result) / 1e18 >
    networkAmount.get(network) * 2
    ? (boolean = true)
    : (boolean = false);
  return boolean;
};

console.log(anotherFunction("mumbai"));

module.exports = checkTokens;
