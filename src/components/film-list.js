import {AbstractComponent} from './../components/abstract-component.js';

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
class FilmList extends AbstractComponent {
  constructor(sections) {
    super();
    this._sections = sections;
  }

  getTemplate() {
    return createFilmListComponent(this._sections);
  }
}

export {FilmList};
