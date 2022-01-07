const { Command } = require("discord.js-commando");

const cmd = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "goodbot",
      group: "fun",
      memberName: "goodbot",
      description: "test",
      hidden: true,
      patterns: [/good(?:\s*)bot/i],
    });
  }
  run(msg) {
    return msg.say("I AM THE GOOD BOT");
  }
};

module.exports = cmd;
