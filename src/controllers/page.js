import {onEscKeyDown} from './../utils/common.js';
import {renderComponent, removeComponent} from './../utils/render.js';
import {FilmCard} from './../components/film-card.js';
import {ShowMoreButton} from './../components/show-more-button.js';
import {FilmInfo} from './../components/film-details.js';
import {NoData} from './../components/no-data.js';

const FILM_CARDS_AMOUNT_ON_START = 5;
const FILM_CARDS_AMOUNT_LOAD_MORE = 5;
const BEGIN_INDEX = 0;

const renderFilmCard = (filmsListContainer, filmCard) => {
  const body = document.body;
  const filmCardComponent = new FilmCard(filmCard);
  const filmInfoComponent = new FilmInfo(filmCard);

  const showFilmDetails = () => {
    body.classList.add(`hide-overflow`);
    body.appendChild(filmInfoComponent.getElement());
    document.addEventListener(`keydown`, onDocumentEscKeyDown);
  };

  const hideFilmDetails = () => {
    body.classList.remove(`hide-overflow`);
    body.removeChild(filmInfoComponent.getElement());
    document.removeEventListener(`keydown`, onDocumentEscKeyDown);
  };

  const onDocumentEscKeyDown = (evt) => {
    onEscKeyDown(evt, hideFilmDetails);
    document.removeEventListener(`keydown`, onDocumentEscKeyDown);
  };

  filmCardComponent.setClickHandler(showFilmDetails);
  filmInfoComponent.setClickHandler(hideFilmDetails);

  renderComponent(filmsListContainer, filmCardComponent);
};

const renderFilmCards = (cards, container) => {
  cards.forEach((card) => {
    renderFilmCard(container, card);
  });
};

class PageController {
  constructor(container) {
    this._container = container;
    this._noData = new NoData();
    this._showMoreButton = new ShowMoreButton();
  }

  renderFilms(films) {
    const filmsListSection = this._container.getElement().querySelector(`.films-list`);
    const filmsListContainer = this._container.getElement().querySelector(`.films-list .films-list__container`);
    const hasFilms = films.length > 0;
    let showingFilmCards = FILM_CARDS_AMOUNT_ON_START;

    if (!hasFilms) {
      renderComponent(filmsListSection, this._noData);
    }

    renderFilmCards(films.slice(BEGIN_INDEX, showingFilmCards), filmsListContainer);
    renderComponent(filmsListSection, this._showMoreButton);

    this._showMoreButton.setClickHandler(() => {
      const prevFilmCards = showingFilmCards;
      showingFilmCards += FILM_CARDS_AMOUNT_LOAD_MORE;

      renderFilmCards(films.slice(prevFilmCards, showingFilmCards), filmsListContainer);

      if (showingFilmCards >= films.length) {
        removeComponent(this._showMoreButton);
      }
    });
  }

  renderFilmsExtra(films, className) {
    const filmsListContainer = this._container.getElement().querySelector(className);
    renderFilmCards(films, filmsListContainer);
  }
}

export {PageController};
