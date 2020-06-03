import {FILM_CARDS_AMOUNT_ON_START, FILM_CARDS_AMOUNT_LOAD_MORE, FILM_RATED_CARDS_AMOUNT, FILM_COMMENTED_CARDS_AMOUNT, BEGIN_INDEX, filmSection, SortType} from './../constants.js';
import {sortFilms} from './../utils/common.js';
import {renderComponent, removeComponent} from './../utils/render.js';
import {FilmList} from './../components/film-list.js';
import {NoFilms} from './../components/no-films.js';
import {ShowMoreButton} from './../components/show-more-button.js';
import {FilmController} from './../controllers/film-controller.js';

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
    this._filmsListComponent = new FilmList(filmSection.all);
    this._filmsListTopRatedComponent = new FilmList(filmSection.rating);
    this._filmsListMostCommentedComponent = new FilmList(filmSection.comment);
    this._NoFilms = new NoFilms();
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
    const films = this._filmsModel.get();
    const filmsForShowing = films.slice(BEGIN_INDEX, this._showingFilmCards);
    const allFilms = this._renderFilmsList(this._filmsListComponent, filmsForShowing);
    const isTopRatedFilms = films.some((it) => it.rating > 0);
    const isMostCommentedFilms = films.some((it) => it.comments.length > 0);

    if (films.length === 0) {
      renderComponent(container, this._NoFilms);
    }

    this._showedFilmControllers = this._showedFilmControllers.concat(allFilms);
    this._filmsListContainer = this._filmsListComponent.getContainer();
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

  show() {
    this._container.show();
  }

  hide() {
    this._container.hide();
  }

  _renderFilmsList(component, films) {
    const filmsListContainer = component.getContainer();

    renderComponent(this._container.getElement(), component);

    return renderFilmCards(films, filmsListContainer, this._onDataChange, this._onViewChange, this._api);
  }

  _renderFilms(films) {
    const newFilms = renderFilmCards(films, this._filmsListContainer, this._onDataChange, this._onViewChange, this._api);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmCards = this._showedFilmControllers.length;
  }

  _renderShowMoreButton() {
    const films = this._filmsModel.get();
    const filmsList = this._filmsListComponent.getElement();

    removeComponent(this._showMoreButton);

    if (this._showingFilmCards >= films.length) {
      return;
    }

    renderComponent(filmsList, this._showMoreButton);
    this._showMoreButton.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const filmsListContainer = this._filmsListComponent.getContainer();
    const prevFilmCards = this._showingFilmCards;

    this._showingFilmCards += FILM_CARDS_AMOUNT_LOAD_MORE;

    const films = this._filmsModel.get();
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
    this._renderFilms(this._filmsModel.get().slice(0, amount));
    this._renderShowMoreButton();
  }

  _onFilterChange() {
    this._updateFilms(FILM_CARDS_AMOUNT_ON_START);
  }

  _onSortTypeChange() {
    this._updateFilms(FILM_CARDS_AMOUNT_ON_START);
  }

  _onDataChange(oldData, newData) {
    this._api.updateFilm(oldData.id, newData)
      .then((filmModel) => {
        const isSuccess = this._filmsModel.update(oldData.id, filmModel);
        const allFilms = [...this._showedFilmControllers, ...this._topRatedFilmControllers, ...this._mostCommentedFilmControllers];

        if (isSuccess) {
          const currentFilm = allFilms.find((film) => film._filmCardComponent._filmCard === oldData);

          currentFilm.render(newData);
        }
      });
  }

  _onViewChange() {
    const allInstances = [...this._showedFilmControllers, ...this._topRatedFilmControllers, ...this._mostCommentedFilmControllers];

    allInstances.forEach((instances) => instances.setDefaultView());
  }
}

export {PageController};
