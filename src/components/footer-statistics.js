import {AbstractSmartComponent} from './../components/abstract-smart-component.js';

const createFooterStatisticsComponent = (filmsAmount) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsAmount} movies inside</p>
    </section>`
  );
};

class FooterStatistics extends AbstractSmartComponent {
  constructor() {
    super();
    this._filmsAmount = 0;
  }

  getTemplate() {
    return createFooterStatisticsComponent(this._filmsAmount);
  }

  setFilmsAmount(films) {
    this._filmsAmount = films.length;
    this.rerender();
  }

  recoveryListeners() {}
}

export {FooterStatistics};
