import {AbstractComponent} from './../components/abstract-component.js';

const createNavigationItemComponent = (item, isActive, hasCount) => {
  const {path, title, amount} = item;
  const activeClass = isActive ? `main-navigation__item--active` : ``;

  return (
    `<a href="#${path}" class="main-navigation__item ${activeClass}">
      ${title}
      ${hasCount ? `<span class="main-navigation__item-count">${amount}</span>` : ``}
    </a>`
  );
};

const createNavigationComponent = (list) => {
  const createNavigationList = list.map((it, i) => createNavigationItemComponent(it, i === 0, i !== 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createNavigationList}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

class Navigation extends AbstractComponent {
  constructor(list) {
    super();
    this._list = list;
  }

  getTemplate() {
    return createNavigationComponent(this._list);
  }
}

export {Navigation};
