import {AbstractSmartComponent} from './../components/abstract-smart-component.js';
import {EMOJIS} from './../mock/constants.js';

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

const createNewCommentComponent = (emoji, comment) => {
  const selectedImageEmoji = emoji ? createImageMarkup(emoji) : ``;

  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label">
        ${selectedImageEmoji}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment !== `` ? `${comment}` : ``}</textarea>
      </label>

      <div class="film-details__emoji-list">${createEmojiListComponent(emoji)}</div>
    </div>`
  );
};

class NewComment extends AbstractSmartComponent {
  constructor() {
    super();
    this._emoji = ``;
    this._comment = ``;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createNewCommentComponent(this._emoji, this._comment);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  resetComment() {
    this._emoji = ``;
    this._comment = ``;
    this.rerender();
  }

  _subscribeOnEvents() {
    const container = this.getElement();
    const emojiList = Array.from(container.querySelectorAll(`.film-details__emoji-item`));

    emojiList.forEach((emojiItem) => {
      emojiItem.addEventListener(`change`, (evt) => {
        this._emoji = evt.target.value;
        this.rerender();
      });
    });

    container.querySelector(`.film-details__comment-input`).addEventListener(`input`, (evt) => {
      this._comment = evt.target.value;
    });
  }
}

export {NewComment};
