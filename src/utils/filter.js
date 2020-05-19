import {FilterType} from './../mock/constants.js';

const getWatchListFilms = (films) => {
  return films.filter((film) => film.isWatchList);
};

const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.WATCHLIST:
      return getWatchListFilms(films);
    case FilterType.HISTORY:
      return getWatchedFilms(films);
    case FilterType.FAVORITES:
      return getFavoritesFilms(films);
  }

  return films;
};

export {getFilmsByFilter};


