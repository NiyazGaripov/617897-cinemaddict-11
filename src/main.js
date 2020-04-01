'use strict';
const pageHeaderElement = document.querySelector(`.header`);
const pageMainElement = document.querySelector(`.main`);
const pageFooterElement = document.querySelector(`.footer`);
const filmCards = [0, 1, 2, 3, 4];
const filmTopRatedCards = [0, 1];
const filmMostCommentedCards = [0, 1];

const createProfileComponent = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
