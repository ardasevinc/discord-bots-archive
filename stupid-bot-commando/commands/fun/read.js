const { Command } = require("discord.js-commando");
const chalk = require("chalk");
const { fetchData, writeData } = require("../../util/fsJSON");

const error = chalk.bold.red;
const info = chalk.blueBright;

const log = console.log;

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

async function getRandomEntry() {
  const data = await fetchData();

  const rngNum = randomInt(0, data.length);

  return data[rngNum];
}

module.exports = class ReadCommand extends Command {
  constructor(client) {
    super(client, {
      name: "read",
      aliases: ["r", "fetch", "getrandommessage", "get"],
      group: "fun",
      memberName: "read",
      description: "Fetches a random entry from the database.",
    });
  }

  run(msg) {
    (async (msg) => {
      const rngEntry = await getRandomEntry();

      const message = `> ${rngEntry.entry}\n-${rngEntry.author}`;

      return msg.say(message);
    })(msg);
  }
};
