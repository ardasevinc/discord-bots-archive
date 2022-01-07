"use strict";
const appRoot = require("app-root-path");
const { fetchGuildChannelManager } = require(`${appRoot}/util/guild`);

async function makeChannel(message, name, options) {
  // can get the guild from guildChannelManager
  const guildChannelManager = fetchGuildChannelManager(message);

  const channel = guildChannelManager.create(name, options);

  return channel;
}

module.exports = {
  makeChannel,
};
