process.env.NODE_PATH = __dirname;
require("module").Module._initPaths();
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const { CommandoClient, SQLiteProvider } = require("discord.js-commando");
const path = require("path");
const { logger } = require("./config/winston");

const client = new CommandoClient({
  commandPrefix: "duel",
  owner: "246975711124914179",
  invite: "https://discord.gg/VgPph7Zr2X",
  commandEditableDuration: 0,
  nonCommandEditable: false,
});

client.registry
  .registerDefaultTypes()
  .registerDefaultGroups()
  .registerGroup("tournament")
  .registerDefaultCommands({
    unknownCommand: false,
  })
  .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
  logger.info(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.user.setActivity("HELP ME IM FORCED TO COUNT DUEL XP ALL DAY LONG");
});

client.on("error", (err) => logger.error(err));

client.dispatcher.addInhibitor((msg) => {
  if (msg.channel.type === "text") {
    if (
      !msg.member.roles.cache.has("768363131474542612") &&
      !client.isOwner(msg.author)
    ) {
      const reason = "Only Leviathan members can use this bot";
      return {
        reason,
        response: msg.reply(reason),
      };
    } else {
      return false;
    }
  } else {
    return false;
  }
});

client.dispatcher.addInhibitor((msg) => {
  if (msg.channel.type === "text" && msg.channel.id !== "814980129629274112") {
    return "this bot can only be used in <#814980129629274112>";
  }
});

client
  .setProvider(
    sqlite
      .open({ filename: "database_prod.db", driver: sqlite3.Database })
      .then((db) => new SQLiteProvider(db))
  )
  .catch(() => logger.error("client setProviderPoo"));

try {
  client.login(process.env.TOKEN);
} catch (err) {
  logger.log(err);
}
