const generateComment = () => {
  return {
    text: `Interesting setting and a good cast`,
    emoji: `./images/emoji/smile.png`,
    author: `Tim Macoveev`,
    date: `2019/12/31 23:59`,
  };
};

const generateComments = (amount) => {
  return new Array(amount)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
