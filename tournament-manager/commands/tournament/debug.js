const path = require("path");
const { Command } = require("discord.js-commando");
const { readData } = require(path.resolve(__dirname, "..", "../util/fsJSON"));

const cmd = class DebugCommand extends Command {
  constructor(client) {
    super(client, {
      name: "debug",
      group: "tournament",
      memberName: "debug",
      description: "debug lol",
      hidden: true,
      argsPromptLimit: 0,
      args: [
        {
          key: "verbose",
          prompt: "verbose data?",
          type: "boolean",
          default: () => undefined,
        },
      ],
    });
  }
  async run(msg, { verbose }) {
    const data = await readData();

    if (verbose) {
      const dataInfo = {
        length: Object.keys(data).length,
      };
      await msg.code("json", JSON.stringify(dataInfo, null, 2));
    }

    return msg.code("json", JSON.stringify(data, null, 2));
  }
};

module.exports = cmd;
