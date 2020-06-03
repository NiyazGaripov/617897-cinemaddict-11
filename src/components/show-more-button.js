import {AbstractComponent} from './../components/abstract-component.js';

const createShowMoreButtonComponent = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return createShowMoreButtonComponent();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}

export {ShowMoreButton};
