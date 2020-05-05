import {getRandomArrayItem, getRandomDate} from './../utils/common.js';
import {TEXT_COMMENTS, EMOJIS, COMMENT_AUTHORS} from './constants.js';

const generateComment = () => {
  return {
    text: getRandomArrayItem(TEXT_COMMENTS),
    emoji: getRandomArrayItem(EMOJIS),
    author: getRandomArrayItem(COMMENT_AUTHORS),
    date: getRandomDate(),
  };
};

const generateComments = (amount) => {
  return new Array(amount)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
