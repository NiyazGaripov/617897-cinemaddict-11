import {AbstractComponent} from './../components/abstract-component.js';

const createNoFilmsComponent = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

class NoFilms extends AbstractComponent {
  getTemplate() {
    return createNoFilmsComponent();
  }
}

export {NoFilms};
