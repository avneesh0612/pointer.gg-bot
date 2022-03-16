const dotenv = require("dotenv");

dotenv.config();

const constants = {
  commandDirectory: "./src/commands",
  eventDirectory: "./src/events",
  prefix: process.env.PREFIX,
};

module.exports = constants;
