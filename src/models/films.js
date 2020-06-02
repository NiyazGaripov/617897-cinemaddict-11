import {FilterType, SortType} from './../constants.js';
import {sortFilms} from './../utils/common.js';
import {getFilmsByFilter} from './../utils/filter.js';

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

  get() {
    const filteredFilms = getFilmsByFilter(this._films, this._activeFilterType);

    return sortFilms(filteredFilms, this._activeSortType);
  }

  getAll() {
    return this._films;
  }

  set(films) {
    this._films = films;
    this._callHandlers(this._dataLoadHandlers);
    this._callHandlers(this._dataChangeHandlers);
  }

  update(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setSortChangeHandler(handler) {
    this._sortingChangeHandlers.push(handler);
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
    this._callHandlers(this._sortingChangeHandlers);
  }

  setDataLoadHandler(handler) {
    this._dataLoadHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

export {Films};
