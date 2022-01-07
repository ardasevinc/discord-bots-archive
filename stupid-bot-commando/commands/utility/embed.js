const { Command } = require("discord.js-commando");

const cmd = class EmbedCommand extends Command {
  constructor(client) {
    super(client, {
      name: "embed",
      group: "util",
      memberName: "embed",
      description: "Test embeds",
    });
  }
  run(msg) {
    return msg.embed({
      title: "title",
      type: "rich",
      description: "description",
      url:
        "https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure",
      timestamp: this.timestamp,
      color: 256,
      footer: {
        text: "footer text",
        icon_url:
          "https://images.ctfassets.net/rporu91m20dc/4KrCV1uQj6CvFqZIYRoQuG/c92e4dcf285e1424bf063ea375baa79a/1_Hell_on_Earth.jpg",
      },
      thumbnail: {
        url:
          "https://images.ctfassets.net/rporu91m20dc/4KrCV1uQj6CvFqZIYRoQuG/c92e4dcf285e1424bf063ea375baa79a/1_Hell_on_Earth.jpg",
        height: 300,
        width: 500,
      },
      provider: {
        name: "provider name",
        url: "https://www.google.com",
      },
      author: {
        name: "author name",
        url: "https://www.discord.com",
        icon_url:
          "https://images.ctfassets.net/rporu91m20dc/4KrCV1uQj6CvFqZIYRoQuG/c92e4dcf285e1424bf063ea375baa79a/1_Hell_on_Earth.jpg",
      },
      fields: [
        {
          name: "field name",
          value: "*field value*",
        },
        {
          name: "field name 2",
          value: "field value 2",
          inline: true,
        },
      ],
    });
  }
};

module.exports = cmd;
