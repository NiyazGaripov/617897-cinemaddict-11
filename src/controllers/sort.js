import {Sort} from './../components/sort.js';
import {SortType} from './../constants.js';
import {renderComponent, replaceComponent, RenderPosition} from './../utils/render.js';

class SortController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._sortingComponent = null;
    this._activeSortType = SortType.DEFAULT;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container;
    const sortTypes = Object.values(SortType).map((type) => {
      return {
        type,
        isActive: type === this._activeSortType,
      };
    });

    const oldComponent = this._sortingComponent;

    this._sortingComponent = new Sort(sortTypes);
    this._sortingComponent.setSortTypeChangeHandler(this._onSortChange);

    if (oldComponent) {
      replaceComponent(this._sortingComponent, oldComponent);
    } else {
      renderComponent(container, this._sortingComponent, RenderPosition.AFTEREND);
    }
  }

  show() {
    this._sortingComponent.show();
  }

  hide() {
    this._sortingComponent.hide();
  }

  _onFilterChange() {
    this._filmsModel.setSortType(SortType.DEFAULT);
    this._activeSortType = SortType.DEFAULT;
    this.render();
  }

  _onSortChange(sortType) {
    if (this._activeSortType === sortType) {
      return;
    }

    this._filmsModel.setSortType(sortType);
    this._activeSortType = sortType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}

export {SortController};
