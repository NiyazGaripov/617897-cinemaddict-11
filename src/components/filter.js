import {AbstractComponent} from './../components/abstract-component.js';
import {setActiveClass} from './../utils/common.js';

const BEGIN_INDEX = 1;

const getFilterTitleByHref = (href) => {
  const index = href.indexOf(`#`) + BEGIN_INDEX;
  return href.slice(index);
};

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

  setFilterChangeHandler(callback) {

    const filterList = Array.from(this.getElement().querySelectorAll(`.main-navigation__item`));

    filterList.forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const filterTitle = getFilterTitleByHref(evt.target.href);
        const container = this.getElement();
        const activeClass = `main-navigation__item--active`;

        setActiveClass(container, evt.target, activeClass);

        callback(filterTitle);
      });
    });
  }

  setFilterClickHandler(callback) {
    this.getElement().addEventListener(`click`, callback);
    this._filterClickHandler = callback;
  }
}

export {Filter};
