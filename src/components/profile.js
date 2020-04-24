import {PROFILES} from './../mock/constants.js';
import {getRandomArrayItem, createElement} from './../utils.js';

const createProfileComponent = () => {
  const userRank = getRandomArrayItem(PROFILES);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

class Profile {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createProfileComponent();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {Profile};
