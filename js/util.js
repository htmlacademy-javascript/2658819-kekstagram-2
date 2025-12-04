
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

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 100 >= 11 && num % 100 <= 14) {
    return genitivePlural;
  }
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

const getUniqueRandomElements = (array, count) => {
  const uniqueRandomElements = new Set();
  const arrayCopy = array.slice();

  while (uniqueRandomElements.size < count && arrayCopy.length > 0) {
    const randomIndex = Math.floor(Math.random() * arrayCopy.length);
    uniqueRandomElements.add(arrayCopy.splice(randomIndex, 1)[0]);
  }
  return Array.from(uniqueRandomElements);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  toggleClass,
  numDecline,
  isEscapeKey,
  getUniqueRandomElements,
  debounce
};
