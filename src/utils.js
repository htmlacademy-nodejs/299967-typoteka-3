'use strict';

const fs = require(`fs`);
const chalk = require(`chalk`);

const {
  DURATION,
  MIN_SENTENCES_COUNT,
  MAX_SENTENCES_COUNT,
  ANNOUNCE_SENTENCES_COUNT,
} = require(`./const`);

const getRandomInt = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);

  return Math.floor(Math.random() * (maxInt - minInt) + minInt);
};

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomElements = (array, count) =>
  new Array(count)
    .fill(``)
    .map(() => getRandomElement(array));

const removeElement = (array, index) => array.filter((it, i) => i !== index);

const getRandomUniqueElements = (array, count) => {
  let truncatedArray = array.slice();
  return new Array(count)
    .fill(``)
    .map(() => {
      if (truncatedArray.length === 0) {
        return null;
      }

      const index = getRandomInt(0, truncatedArray.length - 1);
      const element = truncatedArray[index];
      truncatedArray = removeElement(truncatedArray, index);

      return element;
    });
};

const getRandomBoolean = () => Math.random() > 0.5;
const getRandomDate = (min, max) => new Date(getRandomInt(min.valueOf(), max.valueOf()));

const generateDate = () => {
  const now = Date.now();
  const past = new Date(now - DURATION);
  const [date, time] = getRandomDate(past, now).toLocaleString().split(`, `);

  return `${date.split(`/`).reverse().join(`-`)}, ${time}`;
};


const generatePost = ({sentences, titles, categories}) => {
  const textSentences = getRandomElements(sentences, getRandomInt(MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT));
  const announceSentences = getRandomUniqueElements(textSentences, ANNOUNCE_SENTENCES_COUNT);

  return {
    title: getRandomElement(titles),
    createdDate: generateDate(),
    announce: announceSentences.join(`\n`),
    fullText: textSentences.join(`\n`),
    сategory: getRandomElement(categories),
  };
};

const readContent = async (filename) => {
  try {
    const content = await fs.promises.readFile(filename, `utf-8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const sendResponse = (status, message, res) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>987967-typoteka-3</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = status;
  res.writeHead(status, {
    "content-type": `text/html; charset=utf-8`
  });
  res.end(template);
};

const getMockTitles = async (filename) => JSON.parse(await fs.promises.readFile(filename, `utf-8`)).map((it) => it.title);
const getTitleList = (titles) => `<ul>${titles.map((it) => `<li>${it}</li>`).join(`\n`)}</ul>`;

module.exports = {
  getRandomInt,
  getRandomElement,
  getRandomElements,
  getRandomUniqueElements,
  getRandomBoolean,
  getRandomDate,
  generateDate,
  generatePost,
  readContent,
  sendResponse,
  getMockTitles,
  getTitleList,
};
