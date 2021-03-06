import {FilterType} from './../constants.js';

const BEGIN_INDEX = 1;

const getWatchListFilms = (films) => {
  return films.filter((film) => film.isWatchList);
};

const getWatchedFilms = (films) => {
  return films.filter((film) => film.isWatched);
};

const getFavoritesFilms = (films) => {
  return films.filter((film) => film.isFavorite);
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

const getFilterTitleByHref = (href) => {
  const index = href.indexOf(`#`) + BEGIN_INDEX;
  return href.slice(index);
};

export {getWatchedFilms, getFilmsByFilter, getFilterTitleByHref};


