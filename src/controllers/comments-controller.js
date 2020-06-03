import {encode} from "he";
import {ANIMATION_TIMEOUT} from './../constants.js';
import {renderComponent, removeComponent, replaceComponent} from './../utils/render.js';
import {Comments} from './../components/comments.js';
import {Comment} from './../models/comment.js';


const parseFormData = (formData) => {
  return new Comment({
    "id": null,
    "comment": encode(formData.get(`comment`)),
    "emotion": formData.get(`comment-emoji`),
    "author": null,
    "date": new Date().toISOString(),
  }, null);
};

class CommentsController {
  constructor(container, film, onCommentsDataChange) {
    this._container = container;
    this._film = film;
    this._onCommentsDataChange = onCommentsDataChange;
    this._commentsComponent = null;
  }

  render(comments) {
    const oldCommentsComponent = this._commentsComponent;

    this._commentsComponent = new Comments(comments);
    this._commentsComponent.setDeleteButtonClickHandler((evt, index) => {
      evt.preventDefault();

      this._commentsComponent.disabledDeleteButton(evt);
      this._onCommentsDataChange(this, this._film, comments[index], null);
    });

    this._commentsComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const formData = this._commentsComponent.getData();
      const data = parseFormData(formData);

      this._commentsComponent.disabledField();
      this._onCommentsDataChange(this, this._film, null, data);
    });

    if (oldCommentsComponent) {
      replaceComponent(this._commentsComponent, oldCommentsComponent);
    } else {
      renderComponent(this._container, this._commentsComponent);
    }
  }

  destroy() {
    removeComponent(this._commentsComponent);
    this._commentsComponent.removeEvents();
  }

  animateAddComment() {
    const newCommentField = this._commentsComponent.getElement().querySelector(`.film-details__new-comment`);

    newCommentField.style.animation = `shake ${ANIMATION_TIMEOUT / 1000 }s`;
    this._commentsComponent.addErrorClass();

    setTimeout(() => {
      this._commentsComponent.getElement().style.animation = ``;
      this._commentsComponent.enabledField();
    }, ANIMATION_TIMEOUT);
  }

  animateDeleteComment() {
    this._commentsComponent.getElement().style.animation = `shake ${ANIMATION_TIMEOUT / 1000 }s`;

    setTimeout(() => {
      this._commentsComponent.enabledDeleteButton();
      this._commentsComponent.getElement().style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

}

export {CommentsController};
