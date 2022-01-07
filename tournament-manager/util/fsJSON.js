const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const error = chalk.bold.red;
const info = chalk.blueBright;

const log = console.log;

const dataLocation = path.resolve(__dirname, "../data", "scores_prod.json");

async function readData() {
  try {
    let data = await fs.readFile(dataLocation, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (e) {
    log(error(e));
  }
}

async function writeData(data) {
  try {
    fs.writeFile(dataLocation, JSON.stringify(data, null, 2));
  } catch (e) {
    log(error(e));
  }
}

module.exports = {
  readData,
  writeData,
};
