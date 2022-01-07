const path = require("path");
const { Command } = require("discord.js-commando");
const { readData } = require(path.join(__dirname, "../../", "util/fsJSON"));

function genRankString(sortedData) {
  let rankString = ``;
  let totalScore = 0;

  for (let i = 0; i < sortedData.length; i++) {
    let [id, score, duelCount] = [
      sortedData[i][0],
      sortedData[i][1].score,
      sortedData[i][1].duelCount,
    ];

    totalScore += score;

    const mention = `<@${id}>`;

    rankString += `\`[${
      i + 1
    }]\` ${mention} **-** \`${score} XP ${duelCount} duels\`\n`;
  }

  rankString += `\nTOTAL: \`${totalScore}\``;

  return rankString;
}

function sortData(data) {
  /* [
    [userID, { tag, score }]
  ]
  */
  const arrayified = Object.entries(data);
  const sorted = arrayified.sort((a, b) => b[1].score - a[1].score);

  return sorted;
}

const cmd = class ListCommand extends Command {
  constructor(client) {
    super(client, {
      name: "rank",
      aliases: ["list", "l", "ranks", "ls"],
      group: "tournament",
      memberName: "rank",
      description: "View the current tournament rankings",
      // args: [
      //   {
      //     key: "user",
      //     label: "mention or user id",
      //     prompt: "enter some user id or mention",
      //     type: "user",
      //     default: () => {
      //       return undefined;
      //     },
      //   },
      // ],
    });
  }
  async run(msg) {
    const data = await readData();
    const sorted = sortData(data);
    const rankString = genRankString(sorted);

    return msg.embed({
      title: "LEVIATHAN",
      color: 0xf4d03f,
      timestamp: msg.createdTimestamp,
      fields: [
        {
          name: "Tournament Rankings",
          value: rankString,
        },
      ],
    });
  }
};

module.exports = cmd;
