import {Comments} from './../components/comments.js';
import {renderComponent, removeComponent, replaceComponent} from './../utils/render.js';

class CommentsController {
  constructor(container, onCommentsDataChange) {
    this._container = container;
    this._onCommentsDataChange = onCommentsDataChange;
    this._commentsComponent = null;
  }

  render(comments) {
    const oldCommentsComponent = this._commentsComponent;

    this._commentsComponent = new Comments(comments);

    this._commentsComponent.setDeleteButtonClickHandler((evt, index) => {
      evt.preventDefault();
      this._onCommentsDataChange(comments[index], null);
    });

    this._commentsComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._commentsComponent.getData();
      this._onCommentsDataChange(null, data);
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
}

export {CommentsController};
