import {Comments} from './../components/comments.js';
import {NewComment} from './../components/new-comment.js';
import {renderComponent} from './../utils/render.js';

class CommentController {
  constructor(container, commentsModel, onDataChange) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._commentsComponent = null;
    this._newComment = null;
    this._commentsControllers = [];
    this._showingCommentsCount = 0;
    this._onDataChange = onDataChange;
  }

  render() {
    this._commentsComponent = new Comments(this._commentsModel.getComments());
    this._newComment = new NewComment();

    renderComponent(this._container, this._commentsComponent);
    renderComponent(this._container, this._newComment);

    this._commentsComponent.deleteButtonClickHandler(this._onDeleteButtonClick);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    // TODO: первым параметром должен быть комментарий, у которого нажали кнопку delete
    this._onDataChange(this._commentsComponent._comments, null);
  }
}

export {CommentController};
