import {API} from './api/api.js';
import {AUTHORIZATION, ENTRY_POINT, NavigationType} from './constants.js';
import {renderComponent, removeComponent} from './utils/render.js';
import {FilmsSection} from './components/films-section.js';
import {FooterStatistics} from './components/footer-statistics.js';
import {Loading} from './components/loading.js';
import {MenuNavigation} from './components/menu-navigation.js';
import {Profile} from './components/profile.js';
import {Statistic} from './components/statistics.js';
import {FilterController} from './controllers/filter-controller.js';
import {PageController} from './controllers/page-controller.js';
import {SortController} from './controllers/sort-controller.js';
import {Films} from './models/films.js';

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);

const api = new API(ENTRY_POINT, AUTHORIZATION);
const filmsModel = new Films();

const profileComponent = new Profile();
renderComponent(pageHeader, profileComponent);

const menuNavigation = new MenuNavigation();
renderComponent(pageMain, menuNavigation);

const filterController = new FilterController(menuNavigation.getElement(), filmsModel);
filterController.render();

const filmSectionComponent = new FilmsSection();
renderComponent(pageMain, filmSectionComponent);

const sortingController = new SortController(menuNavigation.getElement(), filmsModel);
sortingController.render();

const loadingComponent = new Loading();
renderComponent(filmSectionComponent.getElement(), loadingComponent);

const pageController = new PageController(filmSectionComponent, filmsModel, api);

const footerStatisticsComponent = new FooterStatistics();
renderComponent(pageFooter, footerStatisticsComponent);

const statisticComponent = new Statistic(filmsModel);
renderComponent(pageMain, statisticComponent);
statisticComponent.hide();

menuNavigation.setClickHandler((type) => {
  switch (type) {
    case NavigationType.FILTER:
      statisticComponent.hide();
      sortingController.show();
      pageController.show();
      break;
    case NavigationType.STATS:
      sortingController.hide();
      pageController.hide();
      statisticComponent.show();
      break;
  }
});

filmsModel.setDataLoadHandler(() => {
  footerStatisticsComponent.setAmount(filmsModel.getAll());
});

filmsModel.setDataChangeHandler(() => {
  profileComponent.setUserRank(filmsModel.getAll());
  statisticComponent.setUserRank(filmsModel.getAll());
});

api.getFilms()
  .then((films) => {
    filmsModel.set(films);
  })
  .catch(() => {
    filmsModel.set([]);
  })
  .finally(() => {
    removeComponent(loadingComponent);
    pageController.render();
  });
