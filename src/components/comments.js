import {AbstractComponent} from './../components/abstract-component.js';
import {formatCommentDate} from './../utils/date.js';

const createCommentComponent = (comment) => {
  const {text, emoji, author, date} = comment;

  const commentDate = formatCommentDate(date);

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

class Comment extends AbstractComponent {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return createCommentsComponent(this._comments);
  }

  deleteButtonClickHandler(callback) {
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, callback);
  }
}

export {Comment};
