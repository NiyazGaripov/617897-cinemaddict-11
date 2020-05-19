import {AbstractComponent} from './../components/abstract-component.js';

const createFilterItemComponent = (item, isActive, hasCount) => {
  const {path, title, amount} = item;
  const activeClass = isActive ? `main-navigation__item--active` : ``;

  return (
    `<a href="#${path}" class="main-navigation__item ${activeClass}">
      ${title}
      ${hasCount ? `<span class="main-navigation__item-count">${amount}</span>` : ``}
    </a>`
  );
};

const createFilterListComponent = (list) => {
  const createFilterList = list.map((it, i) => createFilterItemComponent(it, i === 0, i !== 0)).join(`\n`);

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
  constructor(list) {
    super();
    this._list = list;
  }

  getTemplate() {
    return createFilterListComponent(this._list);
  }
}

export {Filter};
