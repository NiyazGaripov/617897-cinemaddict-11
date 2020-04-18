import {renderComponent} from './utils.js';
import {createProfileComponent} from './components/profile.js';
import {createNavigationComponent} from './components/navigation.js';
import {createSortComponent} from './components/sorting.js';
import {createFilmsListComponent} from './components/film-list.js';
import {createFilmStatisticsComponent} from './components/film-statistics.js';
import {createFilmDetailsComponent} from './components/film-details.js';
import {generateNavigationList} from './mock/nav-list.js';

const pageHeaderElement = document.querySelector(`.header`);
const pageMainElement = document.querySelector(`.main`);
const pageFooterElement = document.querySelector(`.footer`);
const navList = generateNavigationList();

renderComponent(pageHeaderElement, createProfileComponent());
renderComponent(pageMainElement, createNavigationComponent(navList));
renderComponent(pageMainElement, createSortComponent());
renderComponent(pageMainElement, createFilmsListComponent());
renderComponent(pageFooterElement, createFilmStatisticsComponent());
renderComponent(document.body, createFilmDetailsComponent());
