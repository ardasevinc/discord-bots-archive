const command = {
  name: "args",
  description: "info on args provided",
  args: true,
  execute(msg, args) {
    if (!args.length) {
      return msg.channel.send(
        "Roses are red.\nViolets are blue.\nYour arguments are none"
      );
    } else if (args[0] === "test") {
      return msg.reply("Thou dare test me?");
    }

    msg.channel.send(`args: ${args}\nlength: ${args.length}`);
  },
};

module.exports = command;
