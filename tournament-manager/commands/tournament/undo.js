const path = require("path");
const { Command } = require("discord.js-commando");
const { logger } = require("config/winston");
const { readData, writeData } = require(path.resolve(
  __dirname,
  "..",
  "../util/fsJSON"
));

async function changeLastAdded(data, userID, msg, newXP) {
  const lastAdded = data[userID].lastAdded;
  const score = data[userID].score;
  const duelCount = data[userID].duelCount;

  if (score - lastAdded < 0 || duelCount === 0) {
    data[userID].score = 0;
    data[userID].duelCount = 0;
    return data;
  } else {
    data[userID].score -= lastAdded;
    data[userID].lastAdded = 0;
    data[userID].duelCount -= 1;
    if (newXP !== undefined) {
      data[userID].score += newXP;
      data[userID].lastAdded = newXP;
      data[userID].duelCount += 1;
    }
    return data;
  }
}

async function isAuth(member) {
  const rebonID = "184337598007869440";
  const guildLeaderRoleID = "768467038590205993";
  // const ngnl = "396373964756353024";

  const hasGuildLeader = await member.roles.cache.has(guildLeaderRoleID);
  const isRebon = member.id === rebonID;
  // const isNgnl = member.id === ngnl;

  return isRebon || hasGuildLeader || member.client.isOwner(member);
}

const cmd = class TypoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "undo",
      aliases: ["change", "c", "typo", "u"],
      group: "tournament",
      memberName: "undo",
      description: "undo or change last added xp (only undo if xp not given)",
      guildOnly: true,
      args: [
        {
          key: "newXP",
          type: "integer",
          label: "new XP (max 3)",
          min: 0,
          max: 3,
          prompt: "enter the new xp to undo your last command",
          default: () => undefined,
        },
      ],
      argsPromptLimit: 0,
    });
  }
  async run(msg, { newXP }) {
    logger.info({
      message: "undo used",
      usedBy: msg.author,
      newXP,
    });

    let data = await readData();
    data = await changeLastAdded(data, msg.author.id, msg, newXP);
    writeData(data);
    return msg.embed({
      description: "Undo complete",
      timestamp: msg.createdTimestamp,
      footer: {
        text: `by ${msg.author.id}`,
      },
    });
  }
};

module.exports = cmd;
