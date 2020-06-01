import {renderComponent, replaceComponent, removeComponent} from './../utils/render.js';
import {FilmCard} from './../components/film-card.js';
import {FilmInfo} from './../components/film-details.js';
import {ESC_KEYCODE} from './../constants.js';
import {Comments} from './../models/comments.js';
import {CommentsController} from './../controllers/comments.js';
import {Film} from './../models/film.js';

const body = document.body;
const Mode = {
  DEFAULT: `default`,
  MODAL: `modal`,
};

const renderComments = (commentsContainer, comments, onCommentsDataChange) => {
  const commentsController = new CommentsController(commentsContainer, onCommentsDataChange);

  commentsController.render(comments);

  return commentsController;
};

class FilmController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;
    this._mode = Mode.DEFAULT;
    this._film = null;
    this._filmCardComponent = null;
    this._filmInfoComponent = null;
    this._commentsController = null;
    this._commentsModel = new Comments();
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._onCommentsDataChange = this._onCommentsDataChange.bind(this);
    this._commentsModel.setCommentsDataChangeHandlers(this._onCommentsDataChange);
  }

  render(film) {
    this._film = film;
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmInfoComponent = this._filmInfoComponent;

    this._filmCardComponent = new FilmCard(film);
    this._filmInfoComponent = new FilmInfo(film);

    this._filmCardComponent.setClickHandler(() => {
      this._showFilmDetails();
      this._updateComments(film.id);
    });

    this._filmInfoComponent.setCloseButtonClickHandler(() => {
      this._hideFilmDetails();
      this._removeComments();
    });

    this._filmCardComponent.setWatchListButtonClickHandler((evt) => {
      evt.preventDefault();
      this._addFilmToWatchList();
      this._updateComments(film.id);
    });

    this._filmInfoComponent.setWatchListInputChangeHandler(() => {
      this._addFilmToWatchList();
      this._updateComments(film.id);
    });

    this._filmCardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._addFilmToWatched();
      this._updateComments(film.id);
    });

    this._filmInfoComponent.setWatchedInputChangeHandler(() => {
      this._addFilmToWatched();
      this._updateComments(film.id);
    });

    this._filmCardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._addFilmToFavorite();
      this._updateComments(film.id);
    });

    this._filmInfoComponent.setFavoriteInputChangeHandler(() => {
      this._addFilmToFavorite();
      this._updateComments(film.id);
    });

    if (oldFilmCardComponent && oldFilmInfoComponent) {
      replaceComponent(this._filmCardComponent, oldFilmCardComponent);
      replaceComponent(this._filmInfoComponent, oldFilmInfoComponent);
    } else {
      renderComponent(this._container, this._filmCardComponent);
    }
  }

  _showFilmDetails() {
    this._onViewChange();
    body.classList.add(`hide-overflow`);
    body.appendChild(this._filmInfoComponent.getElement());
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _hideFilmDetails() {
    body.classList.remove(`hide-overflow`);
    body.removeChild(this._filmInfoComponent.getElement());
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this._hideFilmDetails();
      this._removeComments();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _addFilmToWatchList() {
    const newFilm = Film.clone(this._film);

    newFilm.isWatchList = !newFilm.isWatchList;
    this._onDataChange(this._film, newFilm);
  }

  _addFilmToWatched() {
    const newFilm = Film.clone(this._film);

    newFilm.isWatched = !newFilm.isWatched;
    this._onDataChange(this._film, newFilm);
  }

  _addFilmToFavorite() {
    const newFilm = Film.clone(this._film);

    newFilm.isFavorite = !newFilm.isFavorite;
    this._onDataChange(this._film, newFilm);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hideFilmDetails();
    }
  }

  destroy() {
    removeComponent(this._filmCardComponent);
    removeComponent(this._filmInfoComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _renderComments(comments) {
    const filmPopup = this._filmInfoComponent.getElement();
    const commentsContainer = filmPopup.querySelector(`.form-details__bottom-container`);

    this._commentsController = renderComments(commentsContainer, comments, this._onCommentsDataChange);
  }

  _removeComments() {
    if (this._commentsController === null) {
      return;
    }

    this._commentsController.destroy();
    this._commentsController = null;
  }

  _updateComments(id) {
    this._removeComments();
    this._api.getComments(id)
      .then((comments) => {
        this._renderComments(comments);
      });
  }

  _onCommentsDataChange(oldData, newData) {
    if (oldData === null) {
      this._commentsModel.addComment(newData);
      this._updateComments(this._commentsModel.getComments());
    } else if (newData === null) {
      this._commentsModel.removeComment(oldData.id);
      this._updateComments(this._commentsModel.getComments());
    }
  }
}

export {FilmController};
