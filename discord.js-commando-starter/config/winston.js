"use strict";
const { createLogger, format, transports } = require("winston");
const appRoot = require("app-root-path");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: `${appRoot}/logs/error.log`,
      level: "error",
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.File({
      filename: `${appRoot}/logs/debug.log`,
      level: "debug",
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 2,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      level: "debug",
      format: format.combine(format.cli(), format.errors({ stack: true })),
      handleExceptions: true,
    })
  );
}

module.exports = {
  logger,
};
