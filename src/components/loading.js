import {AbstractComponent} from './../components/abstract-component.js';

const createLoadingComponent = () => {
  return (
    `<section class="films-list">
        <h2 class="films-list__title">Loading...</h2>
     </section>`
  );
};

class Loading extends AbstractComponent {
  getTemplate() {
    return createLoadingComponent();
  }
}

export {Loading};
