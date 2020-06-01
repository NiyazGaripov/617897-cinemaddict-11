class Comment {
  constructor(data) {
    this.id = data[`id`];
    this.text = data[`comment`];
    this.emoji = data[`emotion`];
    this.author = data[`author`];
    this.date = new Date(data[`date`]);
  }

}

export {Comment};
