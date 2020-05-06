import {renderComponent} from './utils/render.js';
import {Profile} from './components/profile.js';
import {Navigation} from './components/navigation.js';
import {Sort} from './components/sort.js';
import {FilmList} from './components/film-list.js';
import {FilmStatistics} from './components/film-statistics.js';
import {generateNavigationList} from './mock/nav-list.js';
import {generateSortList} from './mock/sort-list.js';
import {generateFilmsCards} from './mock/film-cards.js';
import {FILM_SECTIONS} from './mock/constants.js';
import {PageController} from './controllers/page.js';

const FILM_CARDS_AMOUNT = 20;
const FILM_RATED_CARDS_AMOUNT = 2;
const FILM_COMMENTED_CARDS_AMOUNT = 2;
const BEGIN_INDEX = 0;

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

renderComponent(pageHeader, new Profile());
renderComponent(pageMain, new Navigation(navList));
renderComponent(pageMain, new Sort(sortList));

const filmListComponent = new FilmList(FILM_SECTIONS);
renderComponent(pageMain, filmListComponent);

const page = new PageController(filmListComponent);
page.renderFilms(filmCards);
page.renderFilmsExtra(filmCardsTopRated, filmsTopRatedClass);
page.renderFilmsExtra(filmCardsMostCommented, filmsMostCommentedClass);

renderComponent(pageFooter, new FilmStatistics());
