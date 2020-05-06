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

  const filmInfoComponent = new FilmInfo(filmCard);

  filmInfoComponent.setClickHandler(hideFilmDetails);

  renderComponent(filmsListContainer, filmCardComponent);
};

const renderFilmList = (filmListComponent, films) => {
  const filmsListSection = filmListComponent.getElement().querySelector(`.films-list`);
  const filmsListContainer = filmListComponent.getElement().querySelector(`.films-list .films-list__container`);
  const hasFilms = films.length > 0;

  if (!hasFilms) {
    renderComponent(filmsListSection, new NoData());
  }

  let showingFilmCards = FILM_CARDS_AMOUNT_ON_START;

  const renderCards = (cards, container, begin, end) => {
    cards
    .slice(begin, end)
    .forEach((card) => {
      renderFilmCard(container, card);
    });
  };

  renderCards(films, filmsListContainer, BEGIN_INDEX, showingFilmCards);

  const showMoreButtonComponent = new ShowMoreButton();

  renderComponent(filmsListSection, showMoreButtonComponent);

  showMoreButtonComponent.setClickHandler(() => {
    const prevFilmCards = showingFilmCards;
    showingFilmCards += FILM_CARDS_AMOUNT_LOAD_MORE;

    renderCards(films, filmsListContainer, prevFilmCards, showingFilmCards);

    if (showingFilmCards >= films.length) {
      removeComponent(showMoreButtonComponent);
    }
  });
};

const renderFilmListExtra = (filmListComponent, films, domElement) => {
  const filmsListContainer = filmListComponent.getElement().querySelector(domElement);

  films
    .forEach((card) => {
      renderFilmCard(filmsListContainer, card);
    });
};

class PageController {
  constructor(container) {
    this._container = container;
  }

  renderFilms(films) {
    renderFilmList(this._container, films);
  }

  renderFilmsExtra(films, className) {
    renderFilmListExtra(this._container, films, className);
  }
}

export {PageController};
