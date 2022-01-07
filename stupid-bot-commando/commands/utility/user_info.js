const { Command } = require("discord.js-commando");

const cmd = class UserinfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "whoami",
      aliases: ["who", "am", "userinfo", "ich", "me"],
      group: "util",
      memberName: "whoami",
      description: "Returns some info about the user",
    });
  }
  run(msg) {
    return msg.embed({
      author: {
        name: msg.author.username,
        icon_url: msg.author.displayAvatarURL(),
      },
      fields: [
        {
          name: "ID",
          value: msg.author.id,
          inline: true,
        },
        {
          name: "Tag",
          value: msg.author.tag,
          inline: true,
        },
        {
          name: "Discriminator",
          value: msg.author.discriminator,
          inline: true,
        },
        {
          name: "Username",
          value: msg.author.username,
          inline: true,
        },
        {
          name: "Is a bot?",
          value: msg.author.bot,
          inline: true,
        },
        {
          name: "Last Message Info",
          value: `Last Message Channel ID: ${msg.author.lastMessageChannelID}
                  Last Message ID: ${msg.author.lastMessageID}`,
          inline: false,
        },
      ],
      footer: {
        text: `${msg.createdTimestamp} - ${msg.createdAt.toUTCString()}`,
      },
    });
  }
};

module.exports = cmd;
