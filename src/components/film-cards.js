import {createFilmCardComponent} from './film-card.js';

export const createFilmCardsComponent = (amount) => {
  let filmCardsComponent = ``;
  const filmCardComponent = createFilmCardComponent();

  for (let i = 0; i < amount; i++) {
    filmCardsComponent = `${filmCardsComponent}${filmCardComponent}`;
  }
  return filmCardsComponent;
};
