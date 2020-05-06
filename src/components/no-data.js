import {AbstractComponent} from './../components/abstract-component.js';

const createNoDataComponent = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

class NoData extends AbstractComponent {
  getTemplate() {
    return createNoDataComponent();
  }
}

export {NoData};
