import {AbstractComponent} from './../components/abstract-component.js';
import {SORT_ITEM_NAMES, SortType} from './../constants.js';
import {setActiveClass} from './../utils/common.js';

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
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortComponent();
  }

  getSortType() {
    return this._currentSortType;
  }

  resetSortType() {
    this._currentSortType = SortType.DEFAULT;
    this._setActiveElement(this._currentSortType);
  }

  _setActiveElement(type) {
    const container = this.getElement();
    const item = container.querySelector(`[data-sort-type = ${type}]`);
    const activeClass = `sort__button--active`;

    setActiveClass(container, item, activeClass);
  }

  setSortTypeChangeHandler(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      this._setActiveElement(this._currentSortType);
      callback(this._currentSortType);
    });
  }
}

export {Sort};
