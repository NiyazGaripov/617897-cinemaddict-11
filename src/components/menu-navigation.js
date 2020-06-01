import {AbstractComponent} from './../components/abstract-component.js';
import {NavigationType} from './../constants.js';
import {getFilterTitleByHref} from './../utils/filter.js';

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

  setNavigationClickHandler(callback) {
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

        callback(navigationType);
      });
  }

}

export {MenuNavigation};
