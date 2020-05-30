import {renderComponent, replaceComponent, removeComponent} from './../utils/render.js';
import {FilmCard} from './../components/film-card.js';
import {FilmInfo} from './../components/film-details.js';
import {ESC_KEYCODE} from './../mock/constants.js';
import {Comments} from './../models/comments.js';
import {CommentsController} from './../controllers/comments.js';

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
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
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
    this._commentsModel.setComments(film.comments);
    const comments = this._commentsModel.getComments();

    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmInfoComponent = this._filmInfoComponent;

    this._film = film;
    this._filmCardComponent = new FilmCard(film, comments);
    this._filmInfoComponent = new FilmInfo(film);

    this._filmCardComponent.setClickHandler(() => {
      this._showFilmDetails();
      this._updateComments(comments);
    });

    this._filmInfoComponent.setCloseButtonClickHandler(() => {
      this._hideFilmDetails();
      this._removeComments();
    });

    this._filmCardComponent.setWatchListButtonClickHandler((evt) => {
      evt.preventDefault();
      this._addFilmToWatchList();
      this._updateComments(comments);
    });

    this._filmInfoComponent.setWatchListInputChangeHandler(() => {
      this._addFilmToWatchList();
      this._updateComments(comments);
    });

    this._filmCardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._addFilmToWatched();
      this._updateComments(comments);
    });

    this._filmInfoComponent.setWatchedInputChangeHandler(() => {
      this._addFilmToWatched();
      this._updateComments(comments);
    });

    this._filmCardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._addFilmToFavorite();
      this._updateComments(comments);
    });

    this._filmInfoComponent.setFavoriteInputChangeHandler(() => {
      this._addFilmToFavorite();
      this._updateComments(comments);
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
    this._onDataChange(this._film, Object.assign({}, this._film, {
      isWatchList: !this._film.isWatchList,
    }));
  }

  _addFilmToWatched() {
    this._onDataChange(this._film, Object.assign({}, this._film, {
      isWatched: !this._film.isWatched,
    }));
  }

  _addFilmToFavorite() {
    this._onDataChange(this._film, Object.assign({}, this._film, {
      isFavorite: !this._film.isFavorite,
    }));
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

  _updateComments(comments) {
    this._removeComments();
    this._renderComments(comments);
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
