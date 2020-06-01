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

};

export {API};
