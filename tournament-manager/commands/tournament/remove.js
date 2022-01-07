const path = require("path");
const { Command } = require("discord.js-commando");
const { logger } = require("config/winston");
const { readData, writeData } = require(path.resolve(
  __dirname,
  "..",
  "../util/fsJSON"
));

const cmd = class RemoveCommand extends Command {
  constructor(client) {
    super(client, {
      name: "remove",
      aliases: ["del", "rm", "delete"],
      group: "tournament",
      memberName: "remove",
      description: "removes one or more users from the rankings",
      argsSingleQuotes: true,
      userPermissions: ["ADMINISTRATOR"],
      guildOnly: true,
      args: [
        {
          type: "user",
          key: "user",
          label: "mention or ID",
          prompt: "Enter mention or ID",
          infinite: true,
          wait: 0,
        },
      ],
      argsPromptLimit: 0,
    });
  }
  async run(msg, { user }) {
    logger.info({
      message: "REMOVE",
      usedBy: msg.author,
      user,
    });
    const data = await readData();
    for (let i of user) {
      // logger.info(`trying to remove ${i.username}`);
      if (i.id in data) {
        delete data[i.id];
      } else {
        return msg.reply(
          "You can't remove someone that is not in the rankings"
        );
      }
    }
    await writeData(data);
    return msg.embed({
      title: "Removed User(s)",
      description: `${user}`,
      timestamp: msg.createdTimestamp,
      footer: {
        text: `by ${msg.author.id}`,
      },
    });
  }
};

module.exports = cmd;
