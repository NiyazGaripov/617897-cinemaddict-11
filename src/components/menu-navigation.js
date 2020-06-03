import {NavigationType} from './../constants.js';
import {getFilterTitleByHref} from './../utils/filter.js';
import {AbstractComponent} from './../components/abstract-component.js';

const createMenuNavigationComponent = () => {
  return (
    `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

class MenuNavigation extends AbstractComponent {
  getTemplate() {
    return createMenuNavigationComponent();
  }

  setClickHandler(handler) {
    this.getElement()
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (evt.target.tagName !== `A` && evt.target.parentElement.tagName !== `A`) {
          return;
        }

        const currentLink = evt.target.closest(`a`);
        const href = getFilterTitleByHref(currentLink.href);
        const navigationType = href !== NavigationType.STATS ? NavigationType.FILTER : NavigationType.STATS;

        if (navigationType === NavigationType.STATS) {
          this._addActiveClass();
        } else {
          this._removeActiveClass();
        }

        handler(navigationType);
      });
  }

  _addActiveClass() {
    const container = this.getElement();
    const statistic = container.querySelector(`.main-navigation__additional`);

    statistic.classList.add(`main-navigation__additional--active`);
  }

  _removeActiveClass() {
    const container = this.getElement();
    const statistic = container.querySelector(`.main-navigation__additional`);

    statistic.classList.remove(`main-navigation__additional--active`);
  }
}

export {MenuNavigation};
