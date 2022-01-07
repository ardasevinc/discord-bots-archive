const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const error = chalk.bold.red;
const info = chalk.blueBright;

const log = console.log;

const dataLocation = path.resolve(__dirname, "../data", "data.json");

async function fetchData() {
  // const data = await fs
  //   .readFile(dataLocation, { encoding: "utf8" })
  //   .then((r) => JSON.parse(r))
  //   .catch((err) => log(error(err)));
  // return data;

  try {
    let data = await fs.readFile(dataLocation, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (e) {
    log(error(e));
  }
}

async function writeData(data) {
  // const result = await fs
  //   .writeFile(dataLocation, JSON.stringify(data, null, 2))
  //   .catch((err) => log(error(err)));

  // return result;

  try {
    fs.writeFile(dataLocation, JSON.stringify(data, null, 2));
  } catch (e) {
    log(error(e));
  }
}

module.exports = {
  fetchData,
  writeData,
};
