class Films {
  constructor() {
    this._films = [];
    this._dataChangeHandlers = [];
  }

  getFilms() {
    return this._films;
  }
}

export {Films};
