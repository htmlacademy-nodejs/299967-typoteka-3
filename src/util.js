'use strict';

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.shuffle = (arr) => {
  const newArr = [...arr];

  for (let i = newArr.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [newArr[i], newArr[randomPosition]] = [newArr[randomPosition], newArr[i]];
  }

  return newArr;
};
