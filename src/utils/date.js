import moment from 'moment';

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
    hours = hours >= 0 ? `${hours}<span class="statistic__item-description">h</span>` : ``;
    minutes = minutes >= 0 ? `${minutes}<span class="statistic__item-description">m</span>` : ``;
  } else {
    hours = hours >= 0 ? `${hours}h` : ``;
    minutes = minutes >= 0 ? `${minutes}m` : ``;
  }

  if (hours && minutes) {
    hours += ` `;
  }

  return hours + minutes;
};

export {getFullYear, formatReleaseDate, formatCommentDate, getFilmDuration};
