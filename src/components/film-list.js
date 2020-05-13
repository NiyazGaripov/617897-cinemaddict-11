import {AbstractComponent} from './../components/abstract-component.js';

const createFilmListComponent = (list) => {
  const {section, title} = list;
  const sectionClass = section === `extra` ? `films-list--extra` : `films-list`;
  const hiddenClass = section === `extra` ? `` : `visually-hidden`;

  return (
    `<section class="${sectionClass}">
      <h2 class="films-list__title ${hiddenClass}">${title}</h2>

      <div class="films-list__container">

      </div>
    </section>`
  );
};

class FilmList extends AbstractComponent {
  constructor(sections) {
    super();
    this._sections = sections;
  }

  getTemplate() {
    return createFilmListComponent(this._sections);
  }

  getListContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}

export {FilmList};
