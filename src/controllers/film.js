import {renderComponent} from './../utils/render.js';
import {FilmCard} from './../components/film-card.js';
import {FilmInfo} from './../components/film-details.js';
import {ESC_KEYCODE} from './../mock/constants.js';

const body = document.body;

class FilmController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._film = null;
    this._filmCardComponent = null;
    this._filmInfoComponent = null;
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  render(film) {
    this._film = film;
    this._filmCardComponent = new FilmCard(film);
    this._filmInfoComponent = new FilmInfo(film);

    this._filmCardComponent.setClickHandler(() => {
      this._showFilmDetails();
    });

    this._filmInfoComponent.setCloseButtonClickHandler(() => {
      this._hideFilmDetails();
    });

    this._filmCardComponent.setWatchListButtonClickHandler((evt) => {
      evt.preventDefault();
      this._addFilmToWatchList();
    });

    this._filmInfoComponent.setWatchListInputChangeHandler(() => {
      this._addFilmToWatchList();
    });

    this._filmCardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._addFilmToWatched();
    });

    this._filmInfoComponent.setWatchedInputChangeHandler(() => {
      this._addFilmToWatched();
    });

    this._filmCardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._addFilmToFavorite();
    });

    this._filmInfoComponent.setFavoriteInputChangeHandler(() => {
      this._addFilmToFavorite();
    });

    renderComponent(this._container, this._filmCardComponent);
  }

  _showFilmDetails() {
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
}

export {FilmController};
