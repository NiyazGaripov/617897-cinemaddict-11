import {AbstractSmartComponent} from './../components/abstract-smart-component.js';
import {EMOJIS} from './../constants.js';
import {formatCommentDate} from './../utils/date.js';

const TextButtonDelete = {
  DEFAULT: `Delete`,
  SEND: `Deleting...`,
};

const createCommentComponent = (comment) => {
  const {id, text, emoji, author, date} = comment;
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
          <button class="film-details__comment-delete" data-id="${id}">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createEmojiListComponent = (currentEmoji) => EMOJIS.map((emoji) => {
  const checked = emoji === currentEmoji ? `checked` : ``;

  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${checked}>
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji-${emoji}">
    </label>`
  );
}).join(`\n`);

const createImageMarkup = (emoji) => {
  return (
    `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`
  );
};

const createNewCommentComponent = (emoji, commentText) => {
  const selectedImageEmoji = emoji ? createImageMarkup(emoji) : ``;

  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label">
        ${selectedImageEmoji}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentText}</textarea>
      </label>

      <div class="film-details__emoji-list">${createEmojiListComponent(emoji)}</div>
    </div>`
  );
};

const createCommentsComponent = (comments, options = {}) => {
  const {selectedEmoji, commentText, externalData} = options;
  const commentsComponent = comments.map((comment) => createCommentComponent(comment, externalData)).join(`\n`);
  const newCommentComponent = createNewCommentComponent(selectedEmoji, commentText);
  const commentsAmount = comments.length;

  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsAmount}</span></h3>

      <ul class="film-details__comments-list">
        ${commentsComponent}
      </ul>

      ${newCommentComponent}

    </section>`
  );
};

class Comments extends AbstractSmartComponent {
  constructor(comments) {
    super();
    this._comments = comments;

    this._selectedEmoji = null;
    this._deleteButtonCLickHandler = null;
    this._submitHandler = null;
    this._commentText = ``;

    this._pressedButton = {};

    this._keyUpHandler = () => {
      this._pressedButton = {};
    };

    this._setEmojiChangeHandler();
    this._setTextareaChangeHandler();
  }

  getTemplate() {
    return createCommentsComponent(this._comments, {
      selectedEmoji: this._selectedEmoji,
      commentText: this._commentText,
    });
  }

  recoveryListeners() {
    this._setEmojiChangeHandler();
    this._setTextareaChangeHandler();
    this.setDeleteButtonClickHandler(this._deleteButtonCLickHandler);
    this.setSubmitHandler(this._submitInitialHandler);
  }

  rerender() {
    super.rerender();
  }

  removeElement() {
    super.removeElement();
  }

  getData() {
    const form = document.querySelector(`.film-details__inner`);

    return new FormData(form);
  }

  setDeleteButtonClickHandler(callback) {
    this.getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((item, index) => {

        item.addEventListener(`click`, (evt) => callback(evt, index));
      });

    this._deleteButtonCLickHandler = callback;
  }

  removeEvents() {
    document.removeEventListener(`keydown`, this._submitHandler);
    document.removeEventListener(`keyup`, this._keyUpHandler);
  }

  setSubmitHandler(callback) {
    this._submitHandler = this._getSubmitHandler(callback);
    this._submitInitialHandler = callback;

    document.addEventListener(`keydown`, this._submitHandler);
    document.addEventListener(`keyup`, this._keyUpHandler);
  }

  _getSubmitHandler(callback) {
    return (evt) => {
      const isCtrlKey = evt.key === `Meta` || evt.key === `Control`;
      const isEnterKey = evt.key === `Enter`;

      if (isEnterKey) {
        this._pressedButton.enter = true;
      } else if (isCtrlKey) {
        this._pressedButton.ctrl = true;
      }

      if (this._pressedButton.ctrl && this._pressedButton.enter) {
        callback(evt);
      }
    };
  }

  _setEmojiChangeHandler() {
    const emojiList = this.getElement().querySelectorAll(`.film-details__emoji-item`);

    emojiList.forEach((emoji) => {
      emoji.addEventListener(`change`, (evt) => {
        this._selectedEmoji = evt.target.value;

        this._removeErrorClass();
        this.removeEvents();
        this._setCommentAfterUpdate();
      });
    });
  }

  _setCommentAfterUpdate() {
    const textarea = this.getElement().querySelector(`.film-details__comment-input`);
    textarea.value = this._commentText;
    this.rerender();
  }

  _setTextareaChangeHandler() {
    const textarea = this.getElement().querySelector(`.film-details__comment-input`);

    textarea.addEventListener(`input`, (evt) => {
      this._commentText = evt.target.value;

      this._removeErrorClass();
    });
  }

}

export {Comments};
