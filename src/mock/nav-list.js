import {NAVIGATION_ITEM_NAMES} from './constants.js';

const generateNavigationList = () => {
  const FIRST_ELEMENT = 0;
  const COEFFICIENT = 10;

  return NAVIGATION_ITEM_NAMES.map((it) => {
    return {
      path: it.split(` `)[FIRST_ELEMENT].toLowerCase(),
      title: it,
      amount: Math.floor(Math.random() * COEFFICIENT),
    };
  });
};

export {generateNavigationList};
