import {UserRank, RangValue, SortType} from './../constants.js';

const getUserRank = (amount) => {
  switch (true) {
    case (amount >= RangValue.MIN && amount <= RangValue.MEDIUM):
      return UserRank.NOVICE;
    case (amount > RangValue.MEDIUM && amount <= RangValue.MAX):
      return UserRank.FAN;
    case (amount > RangValue.MAX):
      return UserRank.MOVIE_BUFF;
    default:
      return ``;
  }
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

export {getUserRank, sortFilms};
