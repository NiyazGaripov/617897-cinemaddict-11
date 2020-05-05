import {getRandomArrayItem} from './../utils/common.js';
import {GENRES} from './constants.js';

const generateGenre = () => {
  return {
    name: getRandomArrayItem(GENRES),
  };
};

const generateGenres = (amount) => {
  return new Array(amount)
    .fill(``)
    .map(generateGenre);
};

export {generateGenres};
