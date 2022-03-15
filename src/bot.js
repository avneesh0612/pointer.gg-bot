const dotenv = require("dotenv");

const Client = require("./structures/client.structure.js");
const ready = require("./loaders/ready.loader.js");

dotenv.config();

const client = new Client();

ready(client);
