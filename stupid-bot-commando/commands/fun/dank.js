const { Command } = require("discord.js-commando");

module.exports = class DankCommand extends Command {
  constructor(client) {
    super(client, {
      name: "dank",
      group: "fun",
      memberName: "dank",
      description: "Checks for dank.",

      args: [
        {
          key: "dank",
          label: "dank",
          prompt: "Say dank",
          type: "dank",
        },
      ],
    });
  }

  run(msg, { dank }) {
    return msg.reply(dank);
  }
};
