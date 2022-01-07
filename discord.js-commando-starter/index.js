"use strict";
const dotenv = require("dotenv");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const { CommandoClient, SQLiteProvider } = require("discord.js-commando");
const path = require("path");
const { logger } = require("./config/winston");

const client = new CommandoClient({
  commandPrefix: "prefix",
  owner: "ownerID",
  invite: "invite URL",
  commandEditableDuration: 0,
  nonCommandEditable: false,
});

client.registry
  .registerDefaultTypes()
  .registerDefaultGroups()
  .registerDefaultCommands({
    unknownCommand: false,
  })
  .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
  logger.info(`Logged in as ${client.user.tag}! (${client.user.id})`);
});

client.on("warn", (message) => {
  logger.warn(message);
});

client.on("error", (err) => {
  logger.error(err);
});

client.on("rateLimit", (x) => {
  logger.warn(x);
});

client
  .setProvider(
    sqlite
      .open({ filename: "database.db", driver: sqlite3.Database })
      .then((db) => new SQLiteProvider(db))
  )
  .catch(logger.error);

try {
  dotenv.config();
  client.login(process.env.TOKEN);
} catch (e) {
  logger.error(e);
  process.exit(1);
}
