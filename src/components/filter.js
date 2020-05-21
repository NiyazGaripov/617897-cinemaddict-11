import {AbstractComponent} from './../components/abstract-component.js';

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
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createFilterList}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
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

  setFilterChangeHandler(handler) {

    const filterList = Array.from(this.getElement().querySelectorAll(`.main-navigation__item`));

    filterList.forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const filterTitle = getFilterTitleByHref(evt.target.href);
        const container = this.getElement();
        const activeClass = `main-navigation__item--active`;

        const activeElement = container.querySelector(`.${activeClass}`);

        if (!evt.target.classList.contains(`${activeClass}`)) {
          activeElement.classList.remove(activeClass);
          evt.target.classList.add(activeClass);
        }

        handler(filterTitle);
      });
    });
  }
}

export {Filter};
