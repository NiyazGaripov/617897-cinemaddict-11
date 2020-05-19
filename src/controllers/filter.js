import {Filter} from '../components/filter.js';
import {FilterType, FILTER_NAMES} from "../mock/constants.js";
import {renderComponent, replaceComponent} from "../utils/render.js";
import {getFilmsByFilter} from "../utils/filter.js";

class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }
}

export {FilterController};
