class Comments {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  getComments() {
    return this._comments;
  }
}

export {Comments};
