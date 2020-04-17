import {createFilmCardComponent} from './film-card.js';

export const createFilmCardsComponent = (amount) => {
  let filmCardsComponent = ``;
  for (let i = 0; i < amount.length; i++) {
    const filmCardComponent = createFilmCardComponent(amount[i]);
    filmCardsComponent = `${filmCardsComponent}${filmCardComponent}`;
  }

  return filmCardsComponent;
};
