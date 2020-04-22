import {SORT_ITEM_NAMES} from './constants.js';

const generateSortList = () => {
  return SORT_ITEM_NAMES.map((it) => {
    return {
      title: it,
    };
  });
};

export {generateSortList};
