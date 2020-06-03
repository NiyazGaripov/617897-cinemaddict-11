import {getFilterTitleByHref} from './../utils/filter.js';
import {AbstractComponent} from './../components/abstract-component.js';

const createFilterItemComponent = (filter) => {
  const {path, title, amount, isActive} = filter;
  const activeClass = isActive ? `main-navigation__item--active` : ``;
  const filmsAmount = amount !== null;

  return (
    `<a href="#${path}" class="main-navigation__item ${activeClass}">
      ${title}
      ${filmsAmount ? `<span class="main-navigation__item-count">${amount}</span>` : ``}
    </a>`
  );
};

const createFilterListComponent = (filters) => {
  const createFilterList = filters.map((filter) => createFilterItemComponent(filter)).join(`\n`);

  return (
    `<div class="main-navigation__items">
      ${createFilterList}
    </div>`
  );
};

class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterListComponent(this._filters);
  }

  setChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const activeFilter = evt.target.closest(`a`);

      if (activeFilter) {
        const filterValue = getFilterTitleByHref(activeFilter.href);

        this._toggleActiveClass(activeFilter);
        handler(filterValue);
      }
    });
  }

  _toggleActiveClass(element) {
    const activeFilter = this.getElement().querySelector(`.main-navigation__item--active`);

    activeFilter.classList.remove(`main-navigation__item--active`);
    element.classList.add(`main-navigation__item--active`);
  }
}

export {Filter};
