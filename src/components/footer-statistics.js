import {AbstractComponent} from './../components/abstract-component.js';

const createFooterStatisticsComponent = (films) => {
  const filmsAmount = films.length;
  return (
    `<section class="footer__statistics">
      <p>${filmsAmount} movies inside</p>
    </section>`
  );
};

class FooterStatistics extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFooterStatisticsComponent(this._films);
  }
}

export {FooterStatistics};
