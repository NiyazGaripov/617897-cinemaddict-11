import {renderComponent} from './utils.js';
import {createProfileComponent} from './components/profile.js';
import {createNavigationComponent} from './components/navigation.js';
import {createSortComponent} from './components/sorting.js';
import {createFilmCardComponent} from './components/film-card.js';
import {createFilmsListComponent} from './components/film-list.js';
import {createShowMoreButtonComponent} from './components/show-more-button.js';
import {createFilmStatisticsComponent} from './components/film-statistics.js';
import {createFilmDetailsComponent} from './components/film-details.js';
import {generateNavigationList} from './mock/nav-list.js';
import {generateSortList} from './mock/sort-list.js';
import {generateFilmsCards} from './mock/film-cards.js';
import {FILM_SECTIONS} from './mock/constants.js';

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);
const navList = generateNavigationList();
const sortList = generateSortList();
const FILM_CARDS_AMOUNT = 20;
const FILM_RATED_CARDS_AMOUNT = 2;
const FILM_COMMENTED_CARDS_AMOUNT = 2;
const BEGIN_INDEX = 0;
const filmCards = generateFilmsCards(FILM_CARDS_AMOUNT);
const filmCardsTopRated = filmCards.slice().sort((a, b) => b.rating - a.rating).slice(BEGIN_INDEX, FILM_RATED_CARDS_AMOUNT);
const filmCardsMostCommented = filmCards.slice().sort((a, b) => b.comments.length - a.comments.length).slice(BEGIN_INDEX, FILM_COMMENTED_CARDS_AMOUNT);
const showMoreButtonComponent = createShowMoreButtonComponent();
const FILM_CARDS_AMOUNT_ON_START = 5;
const FILM_CARDS_AMOUNT_LOAD_MORE = 5;
let showingFilmCards = FILM_CARDS_AMOUNT_ON_START;

renderComponent(pageHeader, createProfileComponent());
renderComponent(pageMain, createNavigationComponent(navList));
renderComponent(pageMain, createSortComponent(sortList));
renderComponent(pageMain, createFilmsListComponent(FILM_SECTIONS));

const films = document.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const filmsListTopRatedContainer = films.querySelector(`.films-list--extra .films-list__container`);
const filmsListMostCommentedContainer = films.querySelector(`.films-list--extra:last-child .films-list__container`);

filmCards
  .slice(BEGIN_INDEX, showingFilmCards)
  .forEach((card) => {
    renderComponent(filmsListContainer, createFilmCardComponent(card));
  });

filmCardsTopRated.forEach((card) => {
  renderComponent(filmsListTopRatedContainer, createFilmCardComponent(card));
});

filmCardsMostCommented.forEach((card) => {
  renderComponent(filmsListMostCommentedContainer, createFilmCardComponent(card));
});

renderComponent(filmsList, showMoreButtonComponent);
renderComponent(pageFooter, createFilmStatisticsComponent());

const filmCardCollections = films.querySelectorAll(`.film-card`);
const showMoreButton = filmsList.querySelector(`.films-list__show-more`);

filmCardCollections.forEach((it) => {
  it.addEventListener(`click`, () => {
    renderComponent(document.body, createFilmDetailsComponent(filmCards[0]));
  });
});

showMoreButton.addEventListener(`click`, () => {
  const prevFilmCards = showingFilmCards;
  showingFilmCards += FILM_CARDS_AMOUNT_LOAD_MORE;

  filmCards
    .slice(prevFilmCards, showingFilmCards)
    .forEach((card) => {
      renderComponent(filmsListContainer, createFilmCardComponent(card));
    });

  if (showingFilmCards >= filmCards.length) {
    showMoreButton.remove();
  }
});
