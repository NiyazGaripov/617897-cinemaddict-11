import {renderComponent} from './utils.js';
import {createProfileComponent} from './components/profile.js';
import {createNavigationComponent} from './components/navigation.js';
import {createSortComponent} from './components/sorting.js';
import {createFilmCardsComponent} from './components/film-cards.js';
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
const FILM_RATED_CARDS_AMOUNT = 15;
const FILM_COMMENTED_CARDS_AMOUNT = 10;
const filmCards = generateFilmsCards(FILM_CARDS_AMOUNT);
const filmCardsTopRated = generateFilmsCards(FILM_RATED_CARDS_AMOUNT);
const filmCardsMostCommented = generateFilmsCards(FILM_COMMENTED_CARDS_AMOUNT);
const filmCardsComponent = createFilmCardsComponent(filmCards);
const showMoreButtonComponent = createShowMoreButtonComponent();
const filmTopRatedCardsComponent = createFilmCardsComponent(filmCardsTopRated);
const filmMostCommentedCardsComponent = createFilmCardsComponent(filmCardsMostCommented);


renderComponent(pageHeader, createProfileComponent());
renderComponent(pageMain, createNavigationComponent(navList));
renderComponent(pageMain, createSortComponent(sortList));
renderComponent(pageMain, createFilmsListComponent(FILM_SECTIONS));

const films = document.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const filmsListTopRatedContainer = films.querySelector(`.films-list--extra .films-list__container`);
const filmsListMostCommentedContainer = films.querySelector(`.films-list--extra:last-child .films-list__container`);

renderComponent(pageFooter, createFilmStatisticsComponent());
// renderComponent(document.body, createFilmDetailsComponent(filmCards[0]));
