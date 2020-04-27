import {setValueFormat, createElement} from './../utils.js';

const createCommentComponent = (comment) => {
  const MONTH_COEFFICIENT = 1;
  const {text, emoji, author, date} = comment;
  const year = date.getFullYear();
  const month = setValueFormat(date.getMonth() + MONTH_COEFFICIENT);
  const day = date.getDate();
  const hours = setValueFormat(date.getHours());
  const minutes = setValueFormat(date.getMinutes());
  const commentDate = `${year}/${month}/${day} ${hours}:${minutes}`;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};
const createCommentsComponent = (comments) => {
  const commentsComponent = comments.map((comment) => createCommentComponent(comment)).join(`\n`);

  return (
    `<ul class="film-details__comments-list">
      ${commentsComponent}
    </ul>`
  );
};

class Comment {
  constructor(comments) {
    this._comments = comments;
    this._element = null;
  }

  getTemplate() {
    return createCommentsComponent(this._comments);
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

export {Comment};
