import {getFilmsByFilter} from './../utils/filter.js';
import {sortFilms} from './../utils/common.js';
import {FilterType, SortType} from './../constants.js';

class Films {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;
    this._activeSortType = SortType.DEFAULT;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._sortingChangeHandlers = [];
    this._dataLoadHandlers = [];
  }

  getFilmsAll() {
    return this._films;
  }

  getFilms() {
    const filteredFilms = getFilmsByFilter(this._films, this._activeFilterType);
    return sortFilms(filteredFilms, this._activeSortType);
  }

  setFilms(films) {
    this._films = films;
    this._callHandlers(this._dataLoadHandlers);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  resetFilter() {
    this._activeFilterType = FilterType.ALL;
    this._callHandlers(this._filterChangeHandlers);
  }

  setDataLoadHandler(handler) {
    this._dataLoadHandlers.push(handler);
  }

  setDataChangeHandler(callback) {
    this._dataChangeHandlers.push(callback);
  }

  setFilterChangeHandler(callback) {
    this._filterChangeHandlers.push(callback);
  }

  setSortChangeHandler(callback) {
    this._sortingChangeHandlers.push(callback);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

export {Films};
