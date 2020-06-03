import {AbstractComponent} from './../components/abstract-component.js';

const setActiveClass = (container, element, activeClass) => {
  const node = container.querySelector(`.${activeClass}`);

  if (!element.classList.contains(`${activeClass}`)) {
    node.classList.remove(activeClass);
    element.classList.add(activeClass);
  }
};

const createSortItemComponent = (SortType) => {
  const {type, isActive} = SortType;
  const activeClass = isActive ? `sort__button--active` : ``;

  return (
    type !== `comments` ? `<li>
      <a href="#" data-sort-type="${type}" class="sort__button ${activeClass}">Sort by ${type}</a>
    </li>` : ``
  );
};

const createSortComponent = (sortingTypes) => {
  const createSortList = sortingTypes.map((type) => createSortItemComponent(type)).join(`\n`);

  return (
    `<ul class="sort">
      ${createSortList}
    </ul>`
  );
};

class Sort extends AbstractComponent {
  constructor(sortingTypes) {
    super();
    this._sortingTypes = sortingTypes;
  }

  getTemplate() {
    return createSortComponent(this._sortingTypes);
  }

  _setActiveElement(type) {
    const container = this.getElement();
    const item = container.querySelector(`[data-sort-type = ${type}]`);
    const activeClass = `sort__button--active`;

    setActiveClass(container, item, activeClass);
  }

  setTypeChangeHandler(handler) {
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
      handler(this._currentSortType);
    });
  }
}

export {Sort};
