import {PROFILES} from './../mock/constants.js';
import {getRandomArrayItem} from './../utils.js';
import {AbstractComponent} from './../components/abstract-component.js';

const createProfileComponent = () => {
  const userRank = getRandomArrayItem(PROFILES);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

class Profile extends AbstractComponent {
  getTemplate() {
    return createProfileComponent();
  }
}

export {Profile};
