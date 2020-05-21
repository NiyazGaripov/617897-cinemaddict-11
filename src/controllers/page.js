import {renderComponent, removeComponent} from './../utils/render.js';
import {Sort} from './../components/sort.js';
import {FilmList} from './../components/film-list.js';
import {FilmController} from './../controllers/film.js';
import {ShowMoreButton} from './../components/show-more-button.js';
import {NoData} from './../components/no-data.js';
import {FilmSection, SortType} from './../mock/constants.js';

const FILM_CARDS_AMOUNT_ON_START = 5;
const FILM_CARDS_AMOUNT_LOAD_MORE = 5;
const FILM_RATED_CARDS_AMOUNT = 2;
const FILM_COMMENTED_CARDS_AMOUNT = 2;
const BEGIN_INDEX = 0;

const renderFilmCards = (filmCards, container, onDataChange, onViewChange) => {
  return filmCards.map((filmCard) => {
    const filmController = new FilmController(container, onDataChange, onViewChange);

    filmController.render(filmCard);

    return filmController;
  });
};

const sortFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.release - a.release);
      break;
    case SortType.COMMENTS:
      sortedFilms = showingFilms.sort((a, b) => b.comments.length - a.comments.length);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

class PageController {
  constructor(container, filmsModel) {
    this._container = container.getElement();
    this._filmsModel = filmsModel;
    this._showedFilmControllers = [];
    this._topRatedFilmControllers = [];
    this._mostCommentedFilmControllers = [];
    this._filmsListContainer = null;
    this._showingFilmCards = FILM_CARDS_AMOUNT_ON_START;
    this._filmsListComponent = new FilmList(FilmSection.all);
    this._filmsListTopRatedComponent = new FilmList(FilmSection.rating);
    this._filmsListMostCommentedComponent = new FilmList(FilmSection.comment);
    this._noData = new NoData();
    this._sortComponent = new Sort();
    this._showMoreButton = new ShowMoreButton();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container;
    const films = this._filmsModel.getFilteredFilms();
    const filmsForShowing = films.slice(BEGIN_INDEX, this._showingFilmCards);
    const allFilms = this._renderFilmsList(this._filmsListComponent, filmsForShowing);
    const isTopRatedFilms = films.some((it) => it.rating > 0);
    const isMostCommentedFilms = films.some((it) => it.comments.length > 0);
    const parent = container.parentElement;

    parent.insertBefore(this._sortComponent.getElement(), container);

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

    renderComponent(this._container, component);

    return renderFilmCards(films, filmsListContainer, this._onDataChange, this._onViewChange);
  }

  _renderFilms(films) {
    const newFilms = renderFilmCards(films, this._filmsListContainer, this._onDataChange, this._onViewChange);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmCards = this._showedFilmControllers.length;
  }

  _sortTypeChangeHandler(sortType) {
    this._showingFilmCards = FILM_CARDS_AMOUNT_ON_START;
    const filmsListContainer = this._filmsListComponent.getListContainer();
    const sortedFilms = sortFilms(this._filmsModel.getFilteredFilms(), sortType, BEGIN_INDEX, this._showingFilmCards);

    filmsListContainer.innerHTML = ``;

    const newFilms = renderFilmCards(sortedFilms, filmsListContainer, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = newFilms;
    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    const filmsList = this._filmsListComponent.getElement();
    const filmsListContainer = this._filmsListComponent.getListContainer();
    const films = this._filmsModel.getFilteredFilms();

    removeComponent(this._showMoreButton);

    if (this._showingFilmCards >= films.length) {
      return;
    }

    renderComponent(filmsList, this._showMoreButton);

    this._showMoreButton.setClickHandler(() => {
      const prevFilmCards = this._showingFilmCards;
      this._showingFilmCards += FILM_CARDS_AMOUNT_LOAD_MORE;

      const sortedFilms = sortFilms(films, this._sortComponent.getSortType(), prevFilmCards, this._showingFilmCards);
      const newFilms = renderFilmCards(sortedFilms, filmsListContainer, this._onDataChange, this._onViewChange);

      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmCards >= films.length) {
        removeComponent(this._showMoreButton);
      }
    });
  }

  _removeFilms() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];
  }

  _updateFilms(amount) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilteredFilms().slice(0, amount));
    this._renderShowMoreButton();
  }

  _onDataChange(oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);
    const allFilms = [...this._showedFilmControllers, ...this._topRatedFilmControllers, ...this._mostCommentedFilmControllers];

    if (isSuccess) {
      // TODO: redo V
      allFilms.forEach((film) => {
        const currentFilm = film._filmCardComponent._filmCard;

        if (currentFilm === oldData) {
          film.render(newData);
        }
      });
    }
  }

  _onViewChange() {
    const allInstances = [...this._showedFilmControllers, ...this._topRatedFilmControllers, ...this._mostCommentedFilmControllers];

    allInstances.forEach((instances) => instances.setDefaultView());
  }

  _onFilterChange() {
    this._updateFilms(this._showingFilmCards);
  }
}

export {PageController};
