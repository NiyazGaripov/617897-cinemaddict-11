import {createElement} from './../utils.js';

const createFilmStatisticsComponent = () => {
  return (
    `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`
  );
};

class FilmStatistics {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmStatisticsComponent();
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

export {FilmStatistics};
