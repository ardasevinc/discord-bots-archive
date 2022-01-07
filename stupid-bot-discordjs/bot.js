const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");

const { prefix } = require(path.resolve("./config.json"));

const error = chalk.bold.red;
const info = chalk.blueBright;

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.once("ready", () => {
  console.log(info("ready!"));
});

const commandFiles = fs
  .readdirSync(path.join(__dirname, "./commands/"))
  .filter((file) => file.endsWith(".js"));

for (let commandFile of commandFiles) {
  const command = require(path.join(
    __dirname,
    "./commands/",
    `${commandFile}`
  ));

  client.commands.set(command.name, command);
}

client.on("message", (msg) => {
  if (!msg.content.startsWith(`${prefix}`) || msg.author.bot) {
    return;
  }

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) {
    return;
  }

  const command = client.commands.get(commandName);

  if (command.args === true && args.length === 0) {
    return msg.reply("Enter some arguments!");
  }

  try {
    command.execute(msg, args);
  } catch (err) {
    console.log(error(err));
    msg.reply("Oopsie!");
  }
});

module.exports = {
  client,
  info,
};
