import {AbstractComponent} from './../components/abstract-component.js';

const createFilmsSectionComponent = () => {
  return (
    `<section class="films"></section>`
  );
};

class FilmsSection extends AbstractComponent {
  getTemplate() {
    return createFilmsSectionComponent();
  }
}

export {FilmsSection};
