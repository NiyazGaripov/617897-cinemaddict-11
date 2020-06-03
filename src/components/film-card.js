import {getFullYear, getFilmDuration} from './../utils/date.js';
import {getShortDescription} from './../utils/text.js';
import {AbstractSmartComponent} from './../components/abstract-smart-component.js';

const createFilmCardComponent = (filmCard, commentsAmount) => {
  const {poster, title, rating, release, duration, genres, description, isWatchList, isWatched, isFavorite} = filmCard;
  const releaseYear = getFullYear(release);
  const filmDuration = getFilmDuration(duration);
  const genre = genres.length === 0 ? `` : genres[0];
  const shortDescription = getShortDescription(description, 140);
  const watchListActiveClass = isWatchList ? `film-card__controls-item--active` : ``;
  const watchedActiveClass = isWatched ? `film-card__controls-item--active` : ``;
  const favoriteActiveClass = isFavorite ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${filmDuration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentsAmount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchListActiveClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedActiveClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteActiveClass}">Mark as favorite</button>
      </form>
    </article>`
  );
};

class FilmCard extends AbstractSmartComponent {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._commentsAmount = filmCard.comments.length;
    this.openModalClickHandler = null;
    this.watchlistButtonCLickHandler = null;
    this.watchedButtonClickHandler = null;
    this.favoriteButtonClickHandler = null;
  }

  getTemplate() {
    return createFilmCardComponent(this._filmCard, this._commentsAmount);
  }

  setClickHandler(handler) {
    const poster = this.getElement().querySelector(`.film-card__poster`);
    const title = this.getElement().querySelector(`.film-card__title`);
    const comments = this.getElement().querySelector(`.film-card__comments`);
    const filmInteractiveNodes = Array.of(poster, title, comments);

    filmInteractiveNodes.forEach((element) => {
      element.addEventListener(`click`, handler);
    });

    this.openModalClickHandler = handler;
  }

  updateCommentsAmount(newCommentsAmount) {
    this._commentsAmount = newCommentsAmount;
    this.rerender();
  }

  recoveryListeners() {
    this.setClickHandler(this.openModalClickHandler);
    this.setWatchListButtonClickHandler(this.watchlistButtonCLickHandler);
    this.setWatchedButtonClickHandler(this.watchedButtonClickHandler);
    this.setFavoriteButtonClickHandler(this.favoriteButtonClickHandler);
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);

    this.watchlistButtonCLickHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);

    this.watchedButtonClickHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);

    this.favoriteButtonClickHandler = handler;
  }
}

export {FilmCard};
