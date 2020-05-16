import {AbstractComponent} from './../components/abstract-component.js';
import {EMOJIS} from './../mock/constants.js';

const createEmojiListComponent = (currentEmoji) => EMOJIS.map((emoji) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${currentEmoji ? `checked` : ``}>
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji-${emoji}">
    </label>`
  );
});
