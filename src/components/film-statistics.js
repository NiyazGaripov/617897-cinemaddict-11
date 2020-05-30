import {AbstractComponent} from './../components/abstract-component.js';

const createFilmStatisticsComponent = (films) => {
  const filmsAmount = films.length;
  return (
    `<section class="footer__statistics">
      <p>${filmsAmount} movies inside</p>
    </section>`
  );
};

class FilmStatistics extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFilmStatisticsComponent(this._films);
  }
}

export {FilmStatistics};
