class Film {
  constructor(data) {
    this.id = data[`id`];
    this.poster = data[`film_info`][`poster`];
    this.title = data[`film_info`][`title`];
    this.originalitle = data[`film_info`][`alternative_title`];
    this.rating = data[`film_info`][`total_rating`];
    this.release = new Date(data[`film_info`][`release`][`date`]);
    this.duration = data[`film_info`][`runtime`];
    this.genres = data[`film_info`][`genre`];
    this.description = data[`film_info`][`description`];
    this.age = data[`film_info`][`age_rating`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.comments = data[`comments`];
    this.isWatchList = Boolean(data[`user_details`][`watchlist`]);
    this.isWatched = Boolean(data[`user_details`][`already_watched`]);
    this.isFavorite = Boolean(data[`user_details`][`favorite`]);
    this.watchedDate = new Date(data[`user_details`][`watching_date`]);
  }

  toRaw() {
    return {
      "id": this.id,
      "film_info": {
        "poster": this.poster,
        "title": this.title,
        "alternative_title": this.originalitle,
        "total_rating": this.rating,
        "release": {
          "date": this.release.toISOString(),
          "release_country": this.country
        },
        "runtime": this.duration,
        "genre": this.genres,
        "description": this.description,
        "age_rating": this.age,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,
      },
      "comments": this.comments,
      "user_details": {
        "watchlist": this.isWatchList,
        "already_watched": this.isWatched,
        "favorite": this.isFavorite,
        "watching_date": this.watchedDate.toISOString(),
      }
    };
  }

  static parseFilm(data) {
    return new Film(data);
  }

  static parseFilms(data) {
    return data.map(Film.parseFilm);
  }

  static clone(data) {
    return new Film(data.toRaw());
  }
}

export {Film};
