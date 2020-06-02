class Comments {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  setDataChangeHandlers(handler) {
    this._dataChangeHandlers.push(handler);
  }

  add(comment) {
    this._comments = [].concat(this._comments, comment);
    this._callHandlers(this._dataChangeHandlers);
  }

  remove(comment) {
    const index = this._comments.findIndex((it) => it.id === comment.id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

export {Comments};
