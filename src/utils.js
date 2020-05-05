const MIN_COEFFICIENT = 0;
const MAX_COEFFICIENT = 30000;
const MAX_VALUE = 10;
const ESC_KEYCODE = 27;

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomItem = getRandomIntegerNumber(0, array.length);

  return array[randomItem];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomIntegerNumber(MIN_COEFFICIENT, MAX_COEFFICIENT);

  targetDate.setDate(targetDate.getDate() - diffValue);

  return targetDate;
};

const generateDescription = (desc, minAmount, maxAmount) => {
  const sentencesAmount = getRandomIntegerNumber(minAmount, maxAmount);

  return new Array(sentencesAmount)
    .fill(``)
    .map(() => `${getRandomArrayItem(desc)}`)
    .join(` `);
};

const getShortDescription = (desc, limit) => {
  if (desc.length >= limit) {
    return desc.slice(0, limit).trim() + `…`;
  }
  return desc;
};

const setValueFormat = (value) => {
  return value < MAX_VALUE ? `0${value}` : String(value);
};

const onEscKeyDown = (evt, calback) => {
  if (evt.keyCode === ESC_KEYCODE) {
    calback();
  }
};

export {getRandomIntegerNumber, getRandomArrayItem, getRandomDate, generateDescription, getShortDescription, setValueFormat, onEscKeyDown};
