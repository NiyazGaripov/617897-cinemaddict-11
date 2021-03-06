class Comment {
  constructor(data, filmId) {
    this.filmId = filmId;
    this.id = data[`id`];
    this.text = data[`comment`];
    this.emoji = data[`emotion`];
    this.author = data[`author`];
    this.date = new Date(data[`date`]);
  }

  toRaw() {
    return {
      "id": this.id,
      "comment": this.text,
      "emotion": this.emoji,
      "author": this.author,
      "date": this.date.toISOString(),
    };
  }

  static parseItem(data, filmId) {
    return new Comment(data, filmId);
  }

  static parseList(data, filmId) {
    return data.map((rawComment) => {
      return Comment.parseItem(rawComment, filmId);
    });
  }
}

export {Comment};
