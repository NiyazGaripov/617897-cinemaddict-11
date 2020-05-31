import {getUserRank} from './../utils/common.js';
import {getWatchedFilms} from './../utils/filter.js';
import {AbstractComponent} from './../components/abstract-component.js';

const createProfileComponent = (films) => {
  const watchedFilms = getWatchedFilms(films);
  const watchedFilmsAmount = watchedFilms.length;
  const userRank = getUserRank(watchedFilmsAmount);

  return (
    userRank !== null ? `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>` : ``
  );
};

class Profile extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createProfileComponent(this._films);
  }
}

export {Profile};
