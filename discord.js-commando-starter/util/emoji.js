"use strict";

const appRoot = require("app-root-path");
const logger = require(`${appRoot}/config/winston`);

function findEmoji(msg, name) {
  try {
    const cache = msg.client.emojis.cache;

    if (cache) {
      const emoji = cache.find((x) => x.name === name);

      return emoji;
    } else {
      throw new Error("could not get emoji cache");
    }
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
}

function getEmoji(msg, id) {
  try {
    const cache = msg.client.emojis.cache;

    if (cache) {
      const emoji = cache.get(id);

      return emoji;
    } else {
      throw new Error("could not get emoji cache");
    }
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
}

module.exports = {
  findEmoji,
  getEmoji,
};
