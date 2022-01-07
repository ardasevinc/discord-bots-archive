const { Command } = require("discord.js-commando");
// const chalk = require("chalk");
const { fetchData } = require("../../util/fsJSON");

// const error = chalk.bold.red;
// const info = chalk.blueBright;

// const log = console.log;

module.exports = class InfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "info",
      aliases: ["i"],
      group: "fun",
      memberName: "info",
      description: "Returns some info about the database",
    });
  }

  async run(msg) {
    const data = await fetchData();

    msg.reply(`There are ${data.length} entries recorded`);
  }
};
