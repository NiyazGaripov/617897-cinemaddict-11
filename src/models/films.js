import {getFilmsByFilter} from './../utils/filter.js';
import {FilterType} from './../mock/constants.js';
class Films {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getFilmsAll() {
    return this._films;
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  setFilms(films) {
    this._films = Array.from(films);
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

  setDataChangeHandler(callback) {
    this._dataChangeHandlers.push(callback);
  }

  setFilterChangeHandler(callback) {
    this._filterChangeHandlers.push(callback);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

export {Films};
