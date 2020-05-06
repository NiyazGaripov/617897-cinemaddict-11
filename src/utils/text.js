import {getRandomIntegerNumber, getRandomArrayItem} from './common.js';

const BEGIN_ELEMENT = 0;

const generateDescription = (desc, minAmount, maxAmount) => {
  const sentencesAmount = getRandomIntegerNumber(minAmount, maxAmount);

  return new Array(sentencesAmount)
    .fill(``)
    .map(() => `${getRandomArrayItem(desc)}`)
    .join(` `);
};

const getShortDescription = (desc, limit) => {
  if (desc.length >= limit) {
    return desc.slice(BEGIN_ELEMENT, limit).trim() + `…`;
  }
  return desc;
};

export {generateDescription, getShortDescription};
