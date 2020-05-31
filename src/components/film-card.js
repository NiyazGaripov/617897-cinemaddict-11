import {getFullYear, getFilmDuration} from './../utils/date.js';
import {getShortDescription} from './../utils/text.js';
import {AbstractComponent} from './../components/abstract-component.js';

const createFilmCardComponent = (filmCard, comments) => {
  const {poster, title, rating, release, duration, genres, description, isWatchList, isWatched, isFavorite} = filmCard;
  const releaseYear = getFullYear(release);
  const filmDuration = getFilmDuration(duration);
  const genre = genres.length === 0 ? `` : genres[0];
  const shortDescription = getShortDescription(description, 140);
  const commentsAmount = comments.length;
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

class FilmCard extends AbstractComponent {
  constructor(filmCard, comments) {
    super();
    this._filmCard = filmCard;
    this._comments = comments;
  }

  getTemplate() {
    return createFilmCardComponent(this._filmCard, this._comments);
  }

  setClickHandler(callback) {
    this.getElement()
      .querySelector(`img`)
      .addEventListener(`click`, callback);

    this.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, callback);

    this.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, callback);
  }

  setWatchListButtonClickHandler(callback) {
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, callback);
  }

  setWatchedButtonClickHandler(callback) {
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, callback);
  }

  setFavoriteButtonClickHandler(callback) {
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, callback);
  }
}

export {FilmCard};
