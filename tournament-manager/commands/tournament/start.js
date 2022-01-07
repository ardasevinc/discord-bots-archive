const path = require("path");
const { Command } = require("discord.js-commando");
const { logger } = require("config/winston");
const { writeData } = require(path.resolve(__dirname, "..", "../util/fsJSON"));

async function isAuth(member) {
  const rebonID = "184337598007869440";
  const guildLeaderRoleID = "768467038590205993";
  const ngnl = "396373964756353024";

  const hasGuildLeader = await member.roles.cache.has(guildLeaderRoleID);
  const isRebon = member.id === rebonID;
  const isNgnl = member.id === ngnl;

  return isNgnl || isRebon || hasGuildLeader || member.client.isOwner(member);
}

async function init() {
  const data = {};
  writeData(data);
}

const cmd = class StartCommand extends Command {
  constructor(client) {
    super(client, {
      name: "reset",
      aliases: ["start", "destroy", "init"],
      group: "tournament",
      memberName: "reset",
      description: "Resets everything.",
      guildOnly: true,
    });
  }
  async run(msg) {
    if (msg.member === undefined) {
      return msg.reply("member not available. Contact epiphany#9133");
    }
    if (await isAuth(msg.member)) {
      await init();
      logger.info({
        message: "RESET",
        usedBy: msg.author,
      });
    } else {
      return msg.reply("You are not authorised to use this command.");
    }
    return msg.embed({
      title: "RESET COMPLETE",
      timestamp: msg.createdTimestamp,
      footer: {
        text: `by ${msg.author.id}`,
      },
    });
  }
};

module.exports = cmd;
