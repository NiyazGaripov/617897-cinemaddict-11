const FILM_CARDS_AMOUNT_ON_START = 5;
const FILM_CARDS_AMOUNT_LOAD_MORE = 5;
const FILM_RATED_CARDS_AMOUNT = 2;
const FILM_COMMENTED_CARDS_AMOUNT = 2;
const BEGIN_INDEX = 0;

const Mode = {
  DEFAULT: `default`,
  MODAL: `modal`,
};

const EMOJIS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const filmSection = {
  all: {
    section: `all`,
    title: `All movies. Upcoming`
  },
  rating: {
    section: `extra`,
    title: `Top rated`
  },
  comment: {
    section: `extra`,
    title: `Most commented`
  }
};

const UserRank = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
};

const RangValue = {
  MIN: 1,
  MEDIUM: 10,
  MAX: 20
};

const FILTER_NAMES = [
  `All movies`,
  `Watchlist`,
  `History`,
  `Favorites`,
];

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
  COMMENTS: `comments`,
};

const ESC_KEYCODE = 27;

const HIDDEN_CLASS = `visually-hidden`;

const BAR_HEIGHT = 50;

const PeriodFilterType = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};

const AUTHORIZATION = `Basic a5ybzp10bylbrec9sp`;

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  DELETE: `DELETE`,
  POST: `POST`,
};

const ENTRY_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const HttpStatus = {
  SUCCESS: 200,
  REDIRECT: 300
};

const NavigationType = {
  FILTER: `filters`,
  STATS: `stats`,
};

const ANIMATION_TIMEOUT = 600;

export {FILM_CARDS_AMOUNT_ON_START, FILM_CARDS_AMOUNT_LOAD_MORE, FILM_RATED_CARDS_AMOUNT, FILM_COMMENTED_CARDS_AMOUNT, BEGIN_INDEX, Mode, EMOJIS, FilterType, filmSection, UserRank, RangValue, FILTER_NAMES, SortType, ESC_KEYCODE, HIDDEN_CLASS, BAR_HEIGHT, PeriodFilterType, AUTHORIZATION, Method, ENTRY_POINT, HttpStatus, NavigationType, ANIMATION_TIMEOUT};
