import {NAVIGATION_ITEM_NAMES} from './constants.js';

const generateNavigationList = () => {
  const firstElement = 0;
  const coefficient = 10;
  return NAVIGATION_ITEM_NAMES.map((it) => {
    return {
      path: it.split(` `)[firstElement].toLowerCase(),
      title: it,
      amount: Math.floor(Math.random() * coefficient),
    };
  });
};

export {generateNavigationList};
