import {AbstractSmartComponent} from './../components/abstract-smart-component.js';
import {EMOJIS} from './../mock/constants.js';
import {formatCommentDate} from './../utils/date.js';

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

const createNewCommentComponent = (emoji) => {
  const selectedImageEmoji = emoji ? createImageMarkup(emoji) : ``;

  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label">
        ${selectedImageEmoji}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">${createEmojiListComponent(emoji)}</div>
    </div>`
  );
};

const createCommentsComponent = (comments, options = {}) => {
  const {selectedEmoji} = options;
  const commentsComponent = comments.map((comment) => createCommentComponent(comment)).join(`\n`);
  const newCommentComponent = createNewCommentComponent(selectedEmoji);
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

const parseFormData = (formData) => {
  return {
    id: String(new Date() + Math.random()),
    text: formData.get(`comment`),
    emoji: formData.get(`comment-emoji`),
    author: `Keks`,
    date: new Date(),
  };
};

class Comments extends AbstractSmartComponent {
  constructor(comments) {
    super();
    this._comments = comments;

    this._selectedEmoji = null;
    this._deleteButtonCLickHandler = null;
    this._submitHandler = null;

    this._pressedButton = {};

    this._keyUpHandler = () => {
      this._pressedButton = {};
    };

    this._setEmojiChangeHandler();
  }

  getTemplate() {
    return createCommentsComponent(this._comments, {
      selectedEmoji: this._selectedEmoji,
    });
  }

  recoveryListeners() {
    this._setEmojiChangeHandler();
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
    const formData = new FormData(form);

    return parseFormData(formData);
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

        this.removeEvents();
        this.rerender();
      });
    });
  }
}

export {Comments};
