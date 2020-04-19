const createCommentComponent = (comment) => {
  const {text, emoji, author, date} = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date}</span>
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

export {createCommentsComponent};
