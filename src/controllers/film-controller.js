import {Mode, ESC_KEYCODE} from './../constants.js';
import {renderComponent, replaceComponent, removeComponent} from './../utils/render.js';
import {FilmCard} from './../components/film-card.js';
import {FilmDetails} from './../components/film-details.js';
import {Comments} from './../models/comments.js';
import {CommentsController} from './../controllers/comments-controller.js';
import {Film} from './../models/film.js';

const body = document.body;

const renderComments = (commentsContainer, comments, film, onCommentsDataChange) => {
  const commentsController = new CommentsController(commentsContainer, film, onCommentsDataChange);

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
    this._filmDetailsComponent = null;
    this._commentsController = null;
    this._commentsModel = new Comments();
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._onCommentsDataChange = this._onCommentsDataChange.bind(this);
    this._commentsModel.setDataChangeHandlers(this._onCommentsDataChange);
  }

  render(film) {
    this._film = film;
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmInfoComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCard(film);
    this._filmDetailsComponent = new FilmDetails(film);

    this._filmCardComponent.setClickHandler(() => {
      this._showFilmDetails();
      this._updateComments(film);
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._hideFilmDetails();
      this._removeComments();
    });

    this._filmCardComponent.setWatchListButtonClickHandler((evt) => {
      evt.preventDefault();
      this._addFilmToWatchList();
    });

    this._filmDetailsComponent.setWatchListInputChangeHandler(() => {
      this._addFilmToWatchList();
    });

    this._filmCardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._addFilmToWatched();
    });

    this._filmDetailsComponent.setWatchedInputChangeHandler(() => {
      this._addFilmToWatched();
    });

    this._filmCardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._addFilmToFavorite();
    });

    this._filmDetailsComponent.setFavoriteInputChangeHandler(() => {
      this._addFilmToFavorite();
    });

    if (oldFilmCardComponent && oldFilmInfoComponent) {
      replaceComponent(this._filmCardComponent, oldFilmCardComponent);
      replaceComponent(this._filmDetailsComponent, oldFilmInfoComponent);

      if (this._mode === Mode.MODAL) {
        this._updateComments(film);
      }
    } else {
      renderComponent(this._container, this._filmCardComponent);
    }
  }

  destroy() {
    removeComponent(this._filmCardComponent);
    removeComponent(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hideFilmDetails();
    }
  }

  _showFilmDetails() {
    this._onViewChange();
    body.classList.add(`hide-overflow`);
    body.appendChild(this._filmDetailsComponent.getElement());
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _hideFilmDetails() {
    body.classList.remove(`hide-overflow`);
    body.removeChild(this._filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _addFilmToWatchList() {
    const newFilm = Film.clone(this._film);

    newFilm.isWatchList = !newFilm.isWatchList;
    this._onDataChange(this._film, newFilm);
    this._updateComments(this._film);
  }

  _addFilmToWatched() {
    const newFilm = Film.clone(this._film);

    newFilm.isWatched = !newFilm.isWatched;
    this._onDataChange(this._film, newFilm);
    this._updateComments(this._film);
  }

  _addFilmToFavorite() {
    const newFilm = Film.clone(this._film);

    newFilm.isFavorite = !newFilm.isFavorite;
    this._onDataChange(this._film, newFilm);
    this._updateComments(this._film);
  }

  _renderComments(comments) {
    const container = this._filmDetailsComponent.getElement();
    const commentsContainer = container.querySelector(`.form-details__bottom-container`);

    this._commentsController = renderComments(commentsContainer, comments, this._film, this._onCommentsDataChange);
  }

  _removeComments() {
    if (this._commentsController === null) {
      return;
    }

    this._commentsController.destroy();
    this._commentsController = null;
  }

  _updateComments(film) {
    this._removeComments();
    this._api.getComments(film)
      .then((comments) => {
        this._renderComments(comments);
      });
  }

  _updateCommentsAmountAfterDelete(film, id) {
    film.removeComment(id);

    this._filmCardComponent.updateCommentsAmount(film.comments.length);
  }

  _updateCommentsAmountAfterAdd(film, id) {
    film.addComment(id);

    this._filmCardComponent.updateCommentsAmount(film.comments.length);
  }

  _escKeyDownHandler(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this._hideFilmDetails();
      this._removeComments();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _onCommentsDataChange(commentsContainer, film, oldData, newData) {
    if (oldData === null) {
      this._api.createComment(newData, film.id)
        .then(() => {
          this._commentsModel.add(newData);
          this._updateComments(film);
          this._updateCommentsAmountAfterAdd(film, newData.id);
        })
        .catch(() => {
          commentsContainer.animateAddComment();
        });
    } else if (newData === null) {
      this._api.deleteComment(oldData)
        .then(() => {
          this._commentsModel.remove(oldData.id);
          this._updateComments(film);

          this._updateCommentsAmountAfterDelete(film, oldData.id);
        })
        .catch(() => {
          commentsContainer.animateDeleteComment();
        });
    }
  }
}

export {FilmController};
