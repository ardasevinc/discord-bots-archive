const dotenv = require("dotenv");
const { client, info } = require("./bot");

dotenv.config();

console.log(info("logging in"));
client.login(process.env.TOKEN);
