import {renderComponent, removeComponent} from './../utils/render.js';
import {sortFilms} from './../utils/common.js';
import {FilmList} from './../components/film-list.js';
import {FilmController} from './../controllers/film.js';
import {ShowMoreButton} from './../components/show-more-button.js';
import {NoData} from './../components/no-data.js';
import {FilmSection, SortType} from './../constants.js';

const FILM_CARDS_AMOUNT_ON_START = 5;
const FILM_CARDS_AMOUNT_LOAD_MORE = 5;
const FILM_RATED_CARDS_AMOUNT = 2;
const FILM_COMMENTED_CARDS_AMOUNT = 2;
const BEGIN_INDEX = 0;

const renderFilmCards = (filmCards, container, onDataChange, onViewChange, api) => {
  return filmCards.map((filmCard) => {
    const filmController = new FilmController(container, onDataChange, onViewChange, api);

    filmController.render(filmCard);

    return filmController;
  });
};

class PageController {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;
    this._showedFilmControllers = [];
    this._topRatedFilmControllers = [];
    this._mostCommentedFilmControllers = [];
    this._filmsListContainer = null;
    this._showingFilmCards = FILM_CARDS_AMOUNT_ON_START;
    this._filmsListComponent = new FilmList(FilmSection.all);
    this._filmsListTopRatedComponent = new FilmList(FilmSection.rating);
    this._filmsListMostCommentedComponent = new FilmList(FilmSection.comment);
    this._noData = new NoData();
    this._showMoreButton = new ShowMoreButton();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
    this._filmsModel.setSortChangeHandler(this._onSortTypeChange);
  }

  render() {
    const container = this._container.getElement();
    const films = this._filmsModel.getFilms();
    const filmsForShowing = films.slice(BEGIN_INDEX, this._showingFilmCards);
    const allFilms = this._renderFilmsList(this._filmsListComponent, filmsForShowing);
    const isTopRatedFilms = films.some((it) => it.rating > 0);
    const isMostCommentedFilms = films.some((it) => it.comments.length > 0);

    if (films.length === 0) {
      renderComponent(container, this._noData);
    }

    this._showedFilmControllers = this._showedFilmControllers.concat(allFilms);
    this._filmsListContainer = this._filmsListComponent.getListContainer();
    this._renderShowMoreButton();

    if (isTopRatedFilms) {
      const ratedFilms = sortFilms(films, SortType.RATING, BEGIN_INDEX, FILM_RATED_CARDS_AMOUNT);
      this._topRatedFilmControllers = this._renderFilmsList(this._filmsListTopRatedComponent, ratedFilms);
    }

    if (isMostCommentedFilms) {
      const commentedFilms = sortFilms(films, SortType.COMMENTS, BEGIN_INDEX, FILM_COMMENTED_CARDS_AMOUNT);
      this._mostCommentedFilmControllers = this._renderFilmsList(this._filmsListMostCommentedComponent, commentedFilms);
    }
  }

  _renderFilmsList(component, films) {
    const filmsListContainer = component.getListContainer();

    renderComponent(this._container.getElement(), component);

    return renderFilmCards(films, filmsListContainer, this._onDataChange, this._onViewChange, this._api);
  }

  _renderFilms(films) {
    const newFilms = renderFilmCards(films, this._filmsListContainer, this._onDataChange, this._onViewChange, this._api);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmCards = this._showedFilmControllers.length;
  }

  _renderShowMoreButton() {
    const films = this._filmsModel.getFilms();
    const filmsList = this._filmsListComponent.getElement();

    removeComponent(this._showMoreButton);

    if (this._showingFilmCards >= films.length) {
      return;
    }

    renderComponent(filmsList, this._showMoreButton);

    this._showMoreButton.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const filmsListContainer = this._filmsListComponent.getListContainer();
    const prevFilmCards = this._showingFilmCards;

    this._showingFilmCards += FILM_CARDS_AMOUNT_LOAD_MORE;

    const films = this._filmsModel.getFilms();
    const newFilms = renderFilmCards(films.slice(prevFilmCards, this._showingFilmCards), filmsListContainer, this._onDataChange, this._onViewChange, this._api);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    if (this._showingFilmCards >= films.length) {
      removeComponent(this._showMoreButton);
    }
  }

  _removeFilms() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];
  }

  _updateFilms(amount) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, amount));
    this._renderShowMoreButton();
  }

  _onSortTypeChange() {
    this._updateFilms(FILM_CARDS_AMOUNT_ON_START);
  }

  _onDataChange(oldData, newData) {
    this._api.updateFilm(oldData.id, newData)
      .then((filmModel) => {
        const isSuccess = this._filmsModel.updateFilm(oldData.id, filmModel);
        const allFilms = [...this._showedFilmControllers, ...this._topRatedFilmControllers, ...this._mostCommentedFilmControllers];

        if (isSuccess) {
          allFilms.forEach((film) => {
            const currentFilm = film._filmCardComponent._filmCard;

            if (currentFilm === oldData) {
              film.render(newData);
            }
          });
        }
      });
  }

  _onViewChange() {
    const allInstances = [...this._showedFilmControllers, ...this._topRatedFilmControllers, ...this._mostCommentedFilmControllers];

    allInstances.forEach((instances) => instances.setDefaultView());
  }

  _onFilterChange() {
    this._updateFilms(FILM_CARDS_AMOUNT_ON_START);
  }

  show() {
    this._container.show();
  }

  hide() {
    this._container.hide();
  }
}

export {PageController};
