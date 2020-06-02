import {BEGIN_INDEX} from './../constants.js';

const getShortDescription = (desc, limit) => {
  return desc.length >= limit ? desc.slice(BEGIN_INDEX, limit).trim() + `…` : desc;
};

export {getShortDescription};
