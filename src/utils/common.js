import {UserRank, SortType} from './../constants.js';

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomItem = getRandomIntegerNumber(0, array.length);

  return array[randomItem];
};

const setActiveClass = (container, element, activeClass) => {
  const activeElement = container.querySelector(`.${activeClass}`);

  if (!element.classList.contains(`${activeClass}`)) {
    activeElement.classList.remove(activeClass);
    element.classList.add(activeClass);
  }
};

const getUserRank = (amount) => {
  let userRank;

  if (amount === 0) {
    return null;
  } else if (amount >= 1 && amount <= 10) {
    userRank = UserRank.NOVICE;
  } else if (amount >= 11 && amount <= 20) {
    userRank = UserRank.FAN;
  } else if (amount >= 21) {
    userRank = UserRank.MOVIE_BUFF;
  }

  return userRank;
};

const sortFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.release - a.release);
      break;
    case SortType.COMMENTS:
      sortedFilms = showingFilms.sort((a, b) => b.comments.length - a.comments.length);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

export {getRandomIntegerNumber, getRandomArrayItem, setActiveClass, getUserRank, sortFilms};
