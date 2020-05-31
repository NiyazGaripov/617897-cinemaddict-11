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

const formatReleaseDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const formatCommentDate = (date) => {
  return moment(date).format(`YYYY/MM/DD HH:mm`);
};

const getFilmDuration = (duration, isStatistic = false) => {
  const filmDuration = moment.duration(duration, `minutes`);
  let hours = filmDuration.hours();
  let minutes = filmDuration.minutes();

  if (isStatistic) {
    hours = hours > 0 ? `${hours}<span class="statistic__item-description">h</span>` : ``;
    minutes = minutes > 0 ? `${minutes}<span class="statistic__item-description">m</span>` : ``;
  } else {
    hours = hours > 0 ? `${hours}h` : ``;
    minutes = minutes > 0 ? `${minutes}m` : ``;
  }

  if (hours && minutes) {
    hours += ` `;
  }

  return hours + minutes;
};

export {getRandomDate, getFullYear, formatReleaseDate, formatCommentDate, getFilmDuration};
