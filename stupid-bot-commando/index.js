const { CommandoClient, SQLiteProvider } = require("discord.js-commando");
const dotenv = require("dotenv");
const path = require("path");
const chalk = require("chalk");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
// const winston = require("winston");

dotenv.config();

const info = chalk.blueBright;
const error = chalk.bold.red;
const debug = chalk.hex("#FFA07A");

const log = console.log;

const client = new CommandoClient({
  commandPrefix: "!",
  owner: "246975711124914179",
  invite: "https://discord.gg/4Cmazjw5Bf",
});

client.registry
  .registerDefaultTypes()
  .registerDefaultGroups()
  .registerGroup("fun", "Fun stuff")
  .registerDefaultCommands({
    unknownCommand: false,
  })
  .registerTypesIn(path.join(__dirname, "./types"))
  .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
  log(info(`Logged in as ${client.user.tag}`));

  client.user.setActivity("help me!");
});

client.on("error", (err) => log(error(err)));

client.on("message", (msg) => {
  const cb = async () => {
    await msg.reply("good bot");
  };
  if (
    msg.channel.id === "849999227396685855" &&
    msg.author.id === "849997152863780904"
  ) {
    setTimeout(cb, 1000);
  }
});

client
  .setProvider(
    sqlite
      .open({ filename: "database.db", driver: sqlite3.Database })
      .then((db) => new SQLiteProvider(db))
  )
  .catch((e) => log(error(e)));

client.login(process.env.BOT_TOKEN);

module.exports = {
  info,
  error,
  debug,
};
