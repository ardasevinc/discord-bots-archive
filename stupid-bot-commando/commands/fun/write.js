const { Command } = require("discord.js-commando");
const chalk = require("chalk");
const { fetchData, writeData } = require("../../util/fsJSON");

const error = chalk.bold.red;
const info = chalk.blueBright;

const log = console.log;

async function writeEntry(entryObj) {
  const data = await fetchData();

  data.push(entryObj);

  writeData(data);
}

module.exports = class WriteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "write",
      aliases: ["message", "msg", "w", "record"],
      group: "fun",
      memberName: "write",
      description: "Write a random message to be saved in the database.",
      args: [
        {
          key: "entry",
          prompt: "Record something and maybe it will be read by someone!",
          type: "string",
          error: "hello",
        },
      ],
      argsPromptLimit: 0,
      throttling: {
        usages: 1,
        duration: 1,
      },
      unknown: false,
    });
  }

  run(msg, { entry }) {
    const entryObj = {
      author: msg.author.tag,
      date: msg.createdAt.toUTCString(),
      timestamp: msg.createdTimestamp,
      entry,
    };

    log(info(`trying to write ${entry}`));
    writeEntry(entryObj);

    return msg.reply("I have recorded your great input!");
  }
};
