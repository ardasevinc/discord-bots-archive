const path = require("path");
const { Command } = require("discord.js-commando");
const { logger } = require("config/winston");
const { readData, writeData } = require(path.resolve(
  __dirname,
  "..",
  "../util/fsJSON"
));

async function addDuelXP(xp, userID, msg) {
  const data = await readData();
  const user = await msg.client.users.fetch(userID);

  if (Object.keys(data).length === 10 && data[userID] === undefined) {
    return msg.reply(
      "There is already 10 people in the database\nRemove one or more players to add."
    );
  }

  data[userID] = {
    tag: user.tag,
    score: data[userID] !== undefined ? data[userID]["score"] + xp : xp,
    lastAdded: xp,
    duelCount:
      data[userID] === undefined
        ? 1
        : data[userID]["duelCount"] === undefined
        ? 1
        : (data[userID]["duelCount"] += 1),
  };

  writeData(data);
  return msg.embed({
    description: `Added ${xp} XP to <@${user.id}>`,
    color: 0x00ffff,
    timestamp: msg.createdTimestamp,
    footer: {
      text: `${msg.author.id}`,
    },
  });
}

async function isAuth(member) {
  const rebonID = "184337598007869440";
  const guildLeaderRoleID = "768467038590205993";
  const ngnl = "396373964756353024";

  const hasGuildLeader = await member.roles.cache.has(guildLeaderRoleID);
  const isRebon = member.id === rebonID;
  const isNgnl = member.id === ngnl;

  return isNgnl || isRebon || hasGuildLeader || member.client.isOwner(member);
}

const cmd = class AddCommand extends Command {
  constructor(client) {
    super(client, {
      name: "add",
      aliases: ["a"],
      group: "tournament",
      memberName: "add",
      description: "Adds duel xp",
      guildOnly: true,
      args: [
        {
          key: "xp",
          type: "integer",
          label: "XP (max 3)",
          min: 1,
          max: 3,
          prompt: "How many duel xp do you want to add?",
        },
        {
          key: "user",
          type: "user",
          label: "mention or id (restricted cmd)",
          prompt: "gib id or mention some poor person plz",
          default: () => {
            return undefined;
          },
        },
      ],
      argsPromptLimit: 0,
    });
  }
  async run(msg, { user, xp }) {
    const target = user || msg.author;

    logger.info({
      message: `add ${xp}XP to ${target.username}`,
      usedBy: msg.author,
      target,
    });
    if (user !== undefined && (await isAuth(msg.member))) {
      return await addDuelXP(xp, user.id, msg);
    }
    return await addDuelXP(xp, msg.author.id, msg);
  }
};

module.exports = cmd;
