

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getArrayElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const toggleClass = (element, className = '') => {
  if (element) {
    element.classList.toggle(className);
  }
};

const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const isEscapeKey = (evt) => evt.key === Keys.ESCAPE || evt.key === Keys.ESC;

const closeOnEscKeyDown = (evt, cb) => {
  if (isEscapeKey(evt)) {
    cb();
  }
};

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  // Учитываем остаток от деления на 100 для чисел 11-14
  if (num % 100 >= 11 && num % 100 <= 14) {
    return genitivePlural;
  }

  // Учитываем остаток от деления на 10
  switch (num % 10) {
    case 1:
      return nominative;
    case 2:
    case 3:
    case 4:
      return genitiveSingular;
    default:
      return genitivePlural;
  }
};

export { getRandomInteger, getArrayElement, toggleClass, closeOnEscKeyDown, numDecline, isEscapeKey };

