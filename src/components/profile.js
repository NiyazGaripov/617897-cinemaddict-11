import {PROFILE} from './../mock/constants.js';
import {getRandomArrayItem} from './../utils.js';

const createProfileComponent = () => {
  const userRank = getRandomArrayItem(PROFILE);
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {createProfileComponent};
