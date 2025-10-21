

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getArrayElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export { getRandomInteger, getArrayElement };

