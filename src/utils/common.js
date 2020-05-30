const MAX_VALUE = 10;

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomItem = getRandomIntegerNumber(0, array.length);

  return array[randomItem];
};

const setValueFormat = (value) => {
  return value < MAX_VALUE ? `0${value}` : String(value);
};

const setActiveClass = (container, element, activeClass) => {
  const activeElement = container.querySelector(`.${activeClass}`);

  if (!element.classList.contains(`${activeClass}`)) {
    activeElement.classList.remove(activeClass);
    element.classList.add(activeClass);
  }
};

export {getRandomIntegerNumber, getRandomArrayItem, setValueFormat, setActiveClass};
