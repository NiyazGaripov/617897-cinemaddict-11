import {createElement} from './../utils.js';

const createFilmSectionsComponent = (item) => {
  const {section, title} = item;
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

const createFilmListComponent = (sections) => {
  const filmSections = sections.map((section) => createFilmSectionsComponent(section)).join(`\n`);

  return (
    `<section class="films">
      ${filmSections}
    </section>`
  );
};
class FilmList {
  constructor(sections) {
    this._sections = sections;
    this._element = null;
  }

  getTemplate() {
    return createFilmListComponent(this._sections);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {FilmList};
