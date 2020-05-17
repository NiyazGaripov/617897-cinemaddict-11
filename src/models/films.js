class Films {
  constructor() {
    this._films = [];
    this._dataChangeHandlers = [];
  }

  getFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
  }
}

export {Films};
