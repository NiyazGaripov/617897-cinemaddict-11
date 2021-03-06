import {getUserRank} from './../utils/common.js';
import {getWatchedFilms} from './../utils/filter.js';
import {AbstractSmartComponent} from './../components/abstract-smart-component.js';

const createProfileComponent = (userRank) => {
  return (
    userRank !== null ? `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>` : ` `
  );
};

class Profile extends AbstractSmartComponent {
  constructor() {
    super();
    this._userRank = null;
  }

  getTemplate() {
    return createProfileComponent(this._userRank);
  }

  setUserRank(films) {
    const watchedFilms = getWatchedFilms(films);
    const watchedFilmsAmount = watchedFilms.length;

    this._userRank = getUserRank(watchedFilmsAmount);
    this.rerender();
  }

  recoveryListeners() {}
}

export {Profile};
