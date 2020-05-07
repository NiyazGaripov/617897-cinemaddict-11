import {AbstractComponent} from './../components/abstract-component.js';
import {SORT_ITEM_NAMES, SortType} from './../mock/constants.js';

const createSortItemComponent = (type, isActive) => {
  const activeClass = isActive ? `sort__button--active` : ``;

  return (
    `<li>
      <a href="#" data-sort-type="${type}" class="sort__button ${activeClass}">Sort by ${type}</a>
    </li>`
  );
};

const createSortComponent = () => {
  const createSortList = SORT_ITEM_NAMES.map((it, i) => createSortItemComponent(it, i === 0)).join(`\n`);

  return (
    `<ul class="sort">
      ${createSortList}
    </ul>`
  );
};

class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortComponent();
  }

  getSortType() {
    return this._currenSortType;
  }
}

export {Sort};
