import {Method, HttpStatus} from './../constants.js';
import {Comment} from './../models/comment.js';
import {Film} from './../models/film.js';

const checkStatus = (response) => {
  if (response.status >= HttpStatus.SUCCESS || response.status < HttpStatus.REDIRECT) {
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
      .then(Film.parseList);
  }

  getComments(film) {
    return this._load({url: `comments/${film.id}`})
      .then((response) => response.json())
      .then((data) => Comment.parseList(data, film.id));
  }

  updateFilm(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRaw()),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then((response) => response.json())
      .then(Film.parseItem);
  }

  createComment(comment, filmId) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comment.toRaw()),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then((response) => response.json())
      .then((data) => {
        return {
          movie: Film.parseItem(data.movie),
          comments: Comment.parseList(data.comments, filmId),
        };
      });
  }

  deleteComment(comment) {
    return this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._entryPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((error) => {
        throw error;
      });
  }
};

export {API};
