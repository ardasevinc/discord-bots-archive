const { ArgumentType } = require("discord.js-commando");

class DankArgumentType extends ArgumentType {
  constructor(client) {
    super(client, "dank");
  }

  validate(val) {
    return val.toLowerCase() === "dank";
  }

  parse(val) {
    return val;
  }
}

module.exports = DankArgumentType;
