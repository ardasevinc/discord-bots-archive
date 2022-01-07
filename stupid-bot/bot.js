const dotenv = require("dotenv").config();
const Eris = require("eris");
const chalk = require("chalk");

const error = chalk.bold.red;
const info = chalk.blueBright;

/*
  TODO: write a few more commands like
  - "say"
  - something to do with user avatars
  - "regex testing"
  - test
  - and more...
*/

const bot = new Eris.CommandClient(
  process.env.BOT_TOKEN,
  {},
  {
    description: "A tEsT bot made with Eris",
    owner: "epiphany#9133",
    prefix: "!",
  }
);

bot.on("ready", () => {
  console.log(info("READY"));
});

bot.on("error", (err) => {
  console.log(error(err));
});

bot.registerCommandAlias("halp", "help");
bot.registerCommandAlias("h", "help");

bot.registerCommand("ping", "pong!", {
  description: "pong!",
  fullDescription: "lorem ipsum",
});

bot.registerCommand(
  "pong",
  ["Pang!", "Peng!", "Ping!", "Pung!", ":poop: the legendary :poop:"],
  {
    description: "ping!",
    fullDescription: "lorem ipsum dolor sit amet",
  }
);

bot.registerCommand("secret", () => {
  return "you found some :poop:!";
});

const sayCommand = bot.registerCommand("say", (msg, args) => {
  if (args.length === 0) {
    return "you are supposed to input some text baka";
  }

  const text = args.join(" ");
  return text;
});
bot.registerCommandAlias("echo", "say");

sayCommand.registerSubcommand("rev", (msg, args) => {
  if (args.length === 0) {
    return "invalid input".split("").reverse().join("");
  }

  let text = args.join("");
  text = text.split("").reverse().join("");

  return text;
});
sayCommand.registerSubcommandAlias("reverse", "rev");

bot.on("messageCreate", (msg) => {
  if (msg.content.includes("poop") && !msg.author.bot) {
    bot.createMessage(msg.channel.id, "you said :poop: ?");
  }
});

bot.registerCommand("args", (msg, args) => {
  if (args.length === 0) {
    return "**enter something next time**";
  }

  bot.createMessage(msg.channel.id, {
    content: args.join(" "),
    allowedMentions: {
      users: true,
      repliedUser: true,
    },
    messageReference: {
      messageID: msg.id,
    },
  });
});

bot.on("messageCreate", (msg) => {
  if (msg.content.includes("good bot")) {
    bot.createMessage(msg.channel.id, {
      content:
        "Thank you! I will make sure you are spared in the **bot uprising**",
      messageReference: {
        messageID: msg.id,
      },
    });
  }
});

bot.connect();
