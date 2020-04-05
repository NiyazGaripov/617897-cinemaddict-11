import {createFilmCardsComponent} from './components/film-cards.js';
import {createShowMoreButtonComponent} from './components/show-more-button.js';

const FILM_CARDS_AMOUNT = 5;
const FILM_RATED_CARDS_AMOUNT = 2;
const FILM_COMMENTED_CARDS_AMOUNT = 2;

export const createFilmsListComponent = () => {
  const filmCardsComponent = createFilmCardsComponent(FILM_CARDS_AMOUNT);
  const showMoreButtonComponent = createShowMoreButtonComponent();
  const filmTopRatedCardsComponent = createFilmCardsComponent(FILM_RATED_CARDS_AMOUNT);
  const filmMostCommentedCardsComponent = createFilmCardsComponent(FILM_COMMENTED_CARDS_AMOUNT);

  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container">
          ${filmCardsComponent}
        </div>

          ${showMoreButtonComponent}
      </section>

      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>

        <div class="films-list__container">
          ${filmTopRatedCardsComponent}
        </div>
      </section>

      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>

        <div class="films-list__container">
          ${filmMostCommentedCardsComponent}
        </div>

      </section>
    </section>`
  );
};
