const renderComponent = (container, component, place = `beforeend`) => {
  container.insertAdjacentHTML(place, component);
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomItem = getRandomIntegerNumber(0, array.length);

  return array[randomItem];
};

export {renderComponent, getRandomIntegerNumber, getRandomArrayItem};
