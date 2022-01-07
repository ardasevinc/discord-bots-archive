const command = {
  name: "ping",
  description: "check if the bot is alive",
  execute(msg, args) {
    msg.channel.send("pong");
  },
};

module.exports = command;
