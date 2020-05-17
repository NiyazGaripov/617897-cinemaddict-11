import {formatReleaseDate} from './../utils/date.js';
import {Comment} from './comments.js';
import {Emoji} from './emoji-list';
import {AbstractSmartComponent} from './../components/abstract-smart-component.js';

const createGenresMarkup = (genres) => {
  return genres.map((genre) => {
    return (
      `<span class="film-details__genre">${genre.name}</span>`
    );
  }).join(`\n`);
};

const createImageMarkup = (emoji) => {
  return (
    `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`
  );
};

const createFilmDetailsComponent = (film, emoji) => {
  const {poster, title, rating, release, duration, genres, description, age, director, writers, actors, country, comments, isWatchList, isWatched, isFavorite} = film;
  const releaseDate = formatReleaseDate(release);
  const createGenres = createGenresMarkup(genres);
  const commentsAmount = comments.length;
  const commentList = new Comment(comments).getTemplate();
  const emojiList = new Emoji(emoji).getTemplate();
  const selectedImageEmoji = emoji ? createImageMarkup(emoji) : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">

              <p class="film-details__age">${age}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${title}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    ${createGenres}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchList ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsAmount}</span></h3>

            ${commentList}

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${selectedImageEmoji}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${emojiList}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

class FilmInfo extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._emoji = null;
    this._closeButtonClickHandler = null;
    this._watchListInputChangeHandler = null;
    this._watchedInputChangeHandler = null;
    this._favoriteInputChangeHandler = null;
    this._subscribeOnChoiceEmoji();
  }

  getTemplate() {
    return createFilmDetailsComponent(this._film, this._emoji);
  }

  setCloseButtonClickHandler(callback) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, callback);
    this._closeButtonClickHandler = callback;
  }

  setWatchListInputChangeHandler(callback) {
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, callback);
    this._watchListInputChangeHandler = callback;
  }

  setWatchedInputChangeHandler(callback) {
    this.getElement().querySelector(`#watched`).addEventListener(`change`, callback);
    this._watchedInputChangeHandler = callback;
  }

  setFavoriteInputChangeHandler(callback) {
    this.getElement().querySelector(`#favorite`).addEventListener(`change`, callback);
    this._favoriteInputChangeHandler = callback;
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this.setWatchListInputChangeHandler(this._watchListInputChangeHandler);
    this.setWatchedInputChangeHandler(this._watchedInputChangeHandler);
    this.setFavoriteInputChangeHandler(this._favoriteInputChangeHandler);
    this._subscribeOnChoiceEmoji();
  }

  _subscribeOnChoiceEmoji() {
    const section = this.getElement();
    const emojiList = Array.from(section.querySelectorAll(`.film-details__emoji-item`));

    emojiList.forEach((emojiItem) => {
      emojiItem.addEventListener(`change`, (evt) => {
        this._emoji = evt.target.value;
        this.rerender();
      });
    });
  }
}

export {FilmInfo};
