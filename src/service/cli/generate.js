'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {ExitCode} = require(`../../constants`);
const {getRandomInt, shuffle} = require(`../../util`);

const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_OUTPUT_PATH = `mocks.json`;

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_ANNOUNCES = 5;
const MONTH_RANGE = 3;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trimEnd().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateCreatedDate = () => {
  const prevDate = new Date();
  prevDate.setMonth(prevDate.getMonth() - MONTH_RANGE);
  const randomTimestamp = getRandomInt(prevDate, Date.now());
  const randomDate = new Date(randomTimestamp).toISOString();
  const [date, time] = `${randomDate}`.split(`T`);
  return `${date} ${time.split(`.`)[0]}`;
};

const generatePublications = ({count, titles, sentences, categories}) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdData: generateCreatedDate(),
    announce: shuffle(sentences).slice(0, MAX_ANNOUNCES).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const promises = [
      FILE_TITLES_PATH,
      FILE_SENTENCES_PATH,
      FILE_CATEGORIES_PATH,
    ].map(readContent);

    const [
      titles,
      sentences,
      categories,
    ] = await Promise.all(promises);

    const [countArg] = args;
    const count = Number.parseInt(countArg, 10) || DEFAULT_COUNT;

    if (count > MAX_COUNT) {
      console.error(chalk.red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const publications = generatePublications({
      count,
      titles,
      sentences,
      categories,
    });

    const content = JSON.stringify(publications);

    try {
      await fs.writeFile(FILE_OUTPUT_PATH, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
