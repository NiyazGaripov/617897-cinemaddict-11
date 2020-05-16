import {AbstractComponent} from './../components/abstract-component.js';
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

class Emoji extends AbstractComponent {
  constructor(currentEmoji) {
    super();
    this._currentEmoji = currentEmoji;
  }

  getTemplate() {
    return createEmojiListComponent(this._currentEmoji);
  }
}

export {Emoji};
