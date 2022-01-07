"use strict";
function fetchGuild(message) {
  if (message.guild.available) {
    return message.guild;
  } else {
    throw new Error("Guild not available");
  }
}

function fetchGuildChannelManager(message) {
  const guild = fetchGuild(message);

  if (guild.channels) {
    return guild.channels;
  } else {
    throw new Error("Channels are not available");
  }
}

module.exports = {
  fetchGuild,
  fetchGuildChannelManager,
};
