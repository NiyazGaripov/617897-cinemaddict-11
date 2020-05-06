import {AbstractComponent} from './../components/abstract-component.js';

const createFilmStatisticsComponent = () => {
  return (
    `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`
  );
};

class FilmStatistics extends AbstractComponent {
  getTemplate() {
    return createFilmStatisticsComponent();
  }
}

export {FilmStatistics};
