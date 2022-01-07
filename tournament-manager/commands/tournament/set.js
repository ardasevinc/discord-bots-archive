const path = require("path");
const { Command } = require("discord.js-commando");
const { logger } = require("config/winston");
const { readData, writeData } = require(path.resolve(
  __dirname,
  "..",
  "../util/fsJSON"
));

const cmd = class SetCommand extends Command {
  constructor(client) {
    super(client, {
      name: "set",
      aliases: ["s"],
      group: "tournament",
      memberName: "set",
      description: "Set duel XP of someone",
      userPermissions: ["ADMINISTRATOR"],
      guildOnly: true,
      args: [
        {
          key: "user",
          label: "mention or ID",
          type: "user",
          prompt: "Which user do you want to set the score of?",
        },
        {
          key: "xp",
          label: "XP",
          type: "integer",
          prompt: "gib xp",
        },
      ],
      argsPromptLimit: 0,
    });
  }
  async run(msg, { user, xp }) {
    const data = await readData();

    logger.info({
      message: "set command used",
      usedBy: msg.author,
      target: user,
      xp,
    });

    if (user.id in data) {
      data[user.id]["score"] = xp;
      data[user.id]["lastAdded"] = 0;
      data[user.id]["duelCount"] =
        data[user.id]["duelCount"] === undefined
          ? 0
          : data[user.id]["duelCount"];
    } else {
      data[user.id] = {
        tag: user.tag,
        score: xp,
        duelCount: 0,
      };
    }

    writeData(data);

    // return msg.say(`Set ${user.tag}'s score to ${xp}`);
    return msg.embed({
      description: `Set <@${user.id}>'s score to ${xp}`,
      color: 0xff0000,
      timestamp: msg.createdTimestamp,
      footer: {
        text: `${msg.author.id}`,
      },
    });
  }
};

module.exports = cmd;
