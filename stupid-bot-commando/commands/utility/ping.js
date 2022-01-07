const { Command } = require("discord.js-commando");

const cmd = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "pong",
      aliases: ["hi", "alive", "heartbeat"],
      group: "util",
      memberName: "pong",
      description: "Check if the bot is alive and kicking",
    });
  }
  run(msg) {
    return msg.say("ping!");
  }
};

module.exports = cmd;
