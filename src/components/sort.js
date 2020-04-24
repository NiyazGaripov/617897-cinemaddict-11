import {createElement} from './../utils.js';

const createSortItemComponent = (item, isActive) => {
  const {title} = item;
  const activeClass = isActive ? `sort__button--active` : ``;

  return (
    `<li>
      <a href="#" class="sort__button ${activeClass}">Sort by ${title}</a>
    </li>`
  );
};

const createSortComponent = (list) => {
  const createSortList = list.map((it, i) => createSortItemComponent(it, i === 0)).join(`\n`);

  return (
    `<ul class="sort">
      ${createSortList}
    </ul>`
  );
};

class Sort {
  constructor(list) {
    this._list = list;
    this._element = null;
  }

  getTemplate() {
    return createSortComponent(this._list);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {Sort};
