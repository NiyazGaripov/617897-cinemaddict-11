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
}

export {SortController};
