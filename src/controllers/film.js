import {renderComponent} from './../utils/render.js';
import {FilmCard} from './../components/film-card.js';
import {FilmInfo} from './../components/film-details.js';
import {ESC_KEYCODE} from './../mock/constants.js';

const body = document.body;

class FilmController {
  constructor(container) {
    this._container = container;
    this._filmCardComponent = null;
    this._filmInfoComponent = null;
  }

  render(film) {
    this._filmCardComponent = new FilmCard(film);
    this._filmInfoComponent = new FilmInfo(film);

    this._filmCardComponent.setClickHandler(this._showFilmDetails);
    this._filmInfoComponent.setClickHandler(this._hideFilmDetails);

    renderComponent(this._container, this._filmCardComponent);
  }
}

export {FilmController};
