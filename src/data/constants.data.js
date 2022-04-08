const dotenv = require("dotenv");

dotenv.config();

const constants = {
  commandDirectory: "./src/commands",
  eventDirectory: "./src/events",
  prefix: process.env.PREFIX,
  fromAddress: "0x9321Cec47b5d686Ff230e6c3bEa987F81737e42e",
  footerText: "Made with ❤️ by @Kira.#3246 and @Avneesh#0612",
};

module.exports = constants;
