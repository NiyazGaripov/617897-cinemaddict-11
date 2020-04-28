import {renderComponent} from './utils.js';
import {Profile} from './components/profile.js';
import {Navigation} from './components/navigation.js';
import {Sort} from './components/sort.js';
import {FilmCard} from './components/film-card.js';
import {FilmList} from './components/film-list.js';
import {ShowMoreButton} from './components/show-more-button.js';
import {FilmStatistics} from './components/film-statistics.js';
import {FilmInfo} from './components/film-details.js';
import {NoData} from './components/no-data.js';
import {generateNavigationList} from './mock/nav-list.js';
import {generateSortList} from './mock/sort-list.js';
import {generateFilmsCards} from './mock/film-cards.js';
import {FILM_SECTIONS} from './mock/constants.js';

const FILM_CARDS_AMOUNT = 20;
const FILM_RATED_CARDS_AMOUNT = 2;
const FILM_COMMENTED_CARDS_AMOUNT = 2;
const BEGIN_INDEX = 0;
const FILM_CARDS_AMOUNT_ON_START = 5;
const FILM_CARDS_AMOUNT_LOAD_MORE = 5;

const renderFilmCard = (filmsListContainer, filmCard) => {
  const body = document.body;
  const filmCardComponent = new FilmCard(filmCard);
  const filmPoster = filmCardComponent.getElement().querySelector(`img`);
  const filmTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const filmComments = filmCardComponent.getElement().querySelector(`.film-card__comments`);

  const showFilmDetails = () => {
    body.classList.add(`hide-overflow`);
    body.appendChild(filmInfoComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const hideFilmDetails = () => {
    body.classList.remove(`hide-overflow`);
    body.removeChild(filmInfoComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      hideFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const setEventListener = (element, evt, callback) => {
    element.addEventListener(evt, () => {
      callback();
    });
  };

  setEventListener(filmPoster, `click`, showFilmDetails);
  setEventListener(filmTitle, `click`, showFilmDetails);
  setEventListener(filmComments, `click`, showFilmDetails);

  const filmInfoComponent = new FilmInfo(filmCard);
  const filmInfoCloseButton = filmInfoComponent.getElement().querySelector(`.film-details__close-btn`);

  setEventListener(filmInfoCloseButton, `click`, hideFilmDetails);

  renderComponent(filmsListContainer, filmCardComponent.getElement());
};

const renderFilmList = (filmListComponent, filmCards) => {
  const filmsListSection = filmListComponent.getElement().querySelector(`.films-list`);
  const filmsListContainer = filmListComponent.getElement().querySelector(`.films-list .films-list__container`);
  const hasFilms = filmCards.length > 0;

  if (!hasFilms) {
    renderComponent(filmsListSection, new NoData().getElement());
  }

  let showingFilmCards = FILM_CARDS_AMOUNT_ON_START;

  const renderCards = (cards, container, begin, end) => {
    cards
    .slice(begin, end)
    .forEach((card) => {
      renderFilmCard(container, card);
    });
  };

  renderCards(filmCards, filmsListContainer, BEGIN_INDEX, showingFilmCards);

  const showMoreButtonComponent = new ShowMoreButton();

  renderComponent(filmsListSection, showMoreButtonComponent.getElement());

  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevFilmCards = showingFilmCards;
    showingFilmCards += FILM_CARDS_AMOUNT_LOAD_MORE;

    renderCards(filmCards, filmsListContainer, prevFilmCards, showingFilmCards);

    if (showingFilmCards >= filmCards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
};

const renderFilmListExtra = (filmListComponent, filmCards, domElement) => {
  const filmsListContainer = filmListComponent.getElement().querySelector(domElement);

  filmCards
    .forEach((card) => {
      renderFilmCard(filmsListContainer, card);
    });
};

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);
const filmsTopRatedClass = `.films-list--extra .films-list__container`;
const filmsMostCommentedClass = `.films-list--extra:last-child .films-list__container`;
const navList = generateNavigationList();
const sortList = generateSortList();
const filmCards = generateFilmsCards(FILM_CARDS_AMOUNT);
const filmCardsTopRated = filmCards.slice().sort((a, b) => b.rating - a.rating).slice(BEGIN_INDEX, FILM_RATED_CARDS_AMOUNT);
const filmCardsMostCommented = filmCards.slice().sort((a, b) => b.comments.length - a.comments.length).slice(BEGIN_INDEX, FILM_COMMENTED_CARDS_AMOUNT);

renderComponent(pageHeader, new Profile().getElement());
renderComponent(pageMain, new Navigation(navList).getElement());
renderComponent(pageMain, new Sort(sortList).getElement());

const filmListComponent = new FilmList(FILM_SECTIONS);
renderComponent(pageMain, filmListComponent.getElement());
renderFilmList(filmListComponent, filmCards);
renderFilmListExtra(filmListComponent, filmCardsTopRated, filmsTopRatedClass);
renderFilmListExtra(filmListComponent, filmCardsMostCommented, filmsMostCommentedClass);

renderComponent(pageFooter, new FilmStatistics().getElement());
