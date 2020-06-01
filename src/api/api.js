import {Film} from './../models/film.js';
import {Comment} from './../models/comment.js';
import {Method} from './../constants.js';

const checkStatus = (response) => {
  if (response.status >= 200 || response.status < 300) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const API = class {
  constructor(entryPoint, authorization) {
    this._entryPoint = entryPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(Film.parseFilms);
  }

};

export {API};
