import {AbstractComponent} from './../components/abstract-component.js';

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

class Sort extends AbstractComponent {
  constructor(list) {
    super();
    this._list = list;
  }

  getTemplate() {
    return createSortComponent(this._list);
  }
}

export {Sort};
