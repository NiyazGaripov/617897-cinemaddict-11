import {AbstractSmartComponent} from './../components/abstract-smart-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getUserRank} from './../utils/common.js';
import {getFilmDuration} from './../utils/date.js';
import {getWatchedFilms} from './../utils/filter.js';
import {BAR_HEIGHT, PeriodFilterType} from './../mock/constants.js';
import moment from "moment";

const getWatchedFilmsDuration = (watchedFilms) => {
  const watchedFilmsDurations = watchedFilms.map((film) => {
    return film.duration;
  });

  const duration = watchedFilmsDurations.length === 0 ? 0 : watchedFilmsDurations.reduce((acc, it) => acc + parseFloat(it));

  return duration;
};

const getGenresAmount = (watchedFilms) => {
  let genresAmount = {};

  watchedFilms.map((film) => {
    film.genres.map((genre) => {
      if (genre in genresAmount) {
        genresAmount[genre]++;
      } else {
        genresAmount[genre] = 1;
      }
    });
  });

  return genresAmount;
};

const getTopGenre = (watchedFilms) => {
  const genresAmount = getGenresAmount(watchedFilms);

  let maxGenreAmount = 1;
  let topGenre = ``;

  Object.keys(genresAmount).map((genre) => {
    if (maxGenreAmount === 1 || genresAmount[genre] > maxGenreAmount) {
      maxGenreAmount = genresAmount[genre];
      topGenre = genre;
    }
  });

  return topGenre;
};

const getWatchedFilmsByPeriod = (watchedFilms, dateBegin) => {
  if (!dateBegin) {
    return watchedFilms;
  }

  return watchedFilms.filter((film) => film.watchedDate >= dateBegin);
};

const renderChart = (statisticCtx, watchedFilms) => {
  const genresAmount = getGenresAmount(watchedFilms);
  const genres = Object.keys(genresAmount);
  const filmsAmounts = Object.values(genresAmount);

  statisticCtx.height = BAR_HEIGHT * 5;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [{
        data: filmsAmounts,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatisticRankComponent = (userRank) => {
  return (
    `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${userRank}</span>
    </p>`
  );
};

const createStatisticComponent = ({watchedFilms, period, userRank}) => {
  const watchedFilmsAmount = watchedFilms.length;
  const watchedFilmsDuration = getWatchedFilmsDuration(watchedFilms);
  const totalDuration = getFilmDuration(watchedFilmsDuration, true);
  const topGenre = getTopGenre(watchedFilms);

  return (
    `<section class="statistic">
      ${userRank === null ? `` : createStatisticRankComponent(userRank)}

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${period === PeriodFilterType.ALL_TIME ? `checked` : ``}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${period === PeriodFilterType.TODAY ? `checked` : ``}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${period === PeriodFilterType.WEEK ? `checked` : ``}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${period === PeriodFilterType.MONTH ? `checked` : ``}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${period === PeriodFilterType.YEAR ? `checked` : ``}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedFilmsAmount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${totalDuration}</p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

class Statistic extends AbstractSmartComponent {
  constructor({films}) {
    super();
    this._allFilms = films.getFilteredFilms();
    this._watchedFilms = getWatchedFilms(this._allFilms);
    this._filteredFilms = this._watchedFilms;
    this._userRank = getUserRank(this._watchedFilms.length);
    this._activePeriod = PeriodFilterType.ALL_TIME;
    this._charts = null;

    this._renderCharts(this._filteredFilms);

    this.periodChangeHandler = null;
    this._onPeriodChangeHandler = this._onPeriodChangeHandler.bind(this);
    this.setPeriodChangeHandler(this._onPeriodChangeHandler);
  }

  getTemplate() {
    return createStatisticComponent({watchedFilms: this._filteredFilms, period: this._activePeriod, userRank: this._userRank});
  }

  show() {
    super.show();
    this.rerender();
  }

  recoveryListeners() {
    this.setPeriodChangeHandler(this.periodChangeHandler);
  }

  rerender() {
    super.rerender();
    this._renderCharts(this._filteredFilms);
  }

  setPeriodChangeHandler(callback) {
    const periodInputs = this.getElement().querySelectorAll(`.statistic__filters-input`);

    periodInputs.forEach((input) => {
      input.addEventListener(`change`, (evt) => {
        callback(evt.target.value);
      });
    });

    this.periodChangeHandler = callback;
  }

  _onPeriodChangeHandler(period) {
    this._activePeriod = period;
    let dateBegin = null;

    switch (period) {
      case PeriodFilterType.TODAY:
        dateBegin = moment().startOf(`day`).toDate();
        break;
      case PeriodFilterType.WEEK:
        dateBegin = moment().startOf(`isoWeek`).toDate();
        break;
      case PeriodFilterType.MONTH:
        dateBegin = moment().startOf(`month`).toDate();
        break;
      case PeriodFilterType.YEAR:
        dateBegin = moment().startOf(`year`).toDate();
        break;
      default:
        dateBegin = null;
        break;
    }

    this._filteredFilms = getWatchedFilmsByPeriod(this._watchedFilms, dateBegin);
    this.rerender();
  }

  _renderCharts(films) {
    const element = this.getElement();
    const statisticCtx = element.querySelector(`.statistic__chart`);

    this._resetCharts();
    this._charts = renderChart(statisticCtx, films);
  }

  _resetCharts() {
    if (this._charts) {
      this._charts.destroy();
      this._charts = null;
      this._activePeriod = PeriodFilterType.ALL_TIME;
    }
  }
}

export {Statistic};
