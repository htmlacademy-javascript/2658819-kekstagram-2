

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

/**
 * Склоняет существительное в зависимости от числительного (например, 1 комментарий, 2 комментария, 5 комментариев).
 * @param {number} num Число, определяющее форму склонения.
 * @param {string} nominative Именительный падеж (например, "комментарий").
 * @param {string} genitiveSingular Родительный падеж, единственное число (например, "комментария").
 * @param {string} genitivePlural Родительный падеж, множественное число (например, "комментариев").
 * @returns {string} Правильная форма слова.
 */
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

/**
* Выбирает N уникальных случайных элементов из массива.
* @param {Array<Object>} array Исходный массив
* @param {number} count Количество уникальных элементов для выбора
* @returns {Array<Object>} Новый массив с уникальными случайными элементами
*/
const getUniqueRandomElements = (array, count) => {
  const uniqueRandomElements = new Set();
  // Работаем с копией массива, чтобы не менять исходный и использовать splice
  const arrayCopy = array.slice();

  while (uniqueRandomElements.size < count && arrayCopy.length > 0) {
    const randomIndex = Math.floor(Math.random() * arrayCopy.length);
    // splice удаляет элемент из копии и возвращает его в массиве [element]
    // add принимает сам element, поэтому берем первый элемент из массива от splice
    uniqueRandomElements.add(arrayCopy.splice(randomIndex, 1)[0]);
  }
  return Array.from(uniqueRandomElements);
};

/**
 * Устранение дребезга (Debounce).
 * Запускает функцию только через timeout после последнего вызова.
 */
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
// const debounce = (callback, timeoutDelay) => {
//   let timeoutId;
//   return (...rest) => {
//     // Используем cancelAnimationFrame и requestAnimationFrame
//     cancelAnimationFrame(timeoutId);
//     timeoutId = requestAnimationFrame(() => {
//       // Здесь мы все еще используем setTimeout для задержки в 500мс
//       setTimeout(() => callback.apply(this, rest), timeoutDelay);
//     });
//   };
// };

export { getRandomInteger,
  getArrayElement,
  toggleClass,
  closeOnEscKeyDown,
  numDecline,
  isEscapeKey,
  getUniqueRandomElements,
  debounce };

