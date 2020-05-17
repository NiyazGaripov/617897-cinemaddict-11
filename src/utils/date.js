import moment from 'moment';
import {getRandomIntegerNumber} from './common.js';

const MIN_COEFFICIENT = 0;
const MAX_COEFFICIENT = 30000;

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomIntegerNumber(MIN_COEFFICIENT, MAX_COEFFICIENT);

  targetDate.setDate(targetDate.getDate() - diffValue);

  return targetDate;
};

const getFullYear = (date) => {
  return moment(date).format(`YYYY`);
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export {getRandomDate, getFullYear, formatDate};
