
// --- Константы масштабирования ---
const SCALE_STEP = 25; // Шаг изменения масштаба
const MIN_SCALE = 25; // Минимальный масштаб в процентах
const MAX_SCALE = 100; // Максимальный масштаб в процентах
const DEFAULT_SCALE = 100; // Масштаб по умолчанию

// --- DOM элементы ---
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

/**
 * Применяет CSS-трансформацию масштабирования к изображению
 * и обновляет текстовое поле ввода формы.
 * @param {number} value Процент масштаба (например, 75).
 */
const applyScale = (value) => {
  const formattedValue = `${value}%`;
  scaleControlValue.value = formattedValue;
  scaleControlValue.setAttribute('value', formattedValue);
  imagePreviewElement.style.transform = `scale(${value / 100})`;
};

/**
 * Обработчик кнопки "Уменьшить".
 */
const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);

  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }

  applyScale(newValue);
};

/**
 * Обработчик кнопки "Увеличить".
 */
const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);

  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }

  applyScale(newValue);
};


/**
 * Инициализирует функционал масштабирования при открытии формы.
 * Устанавливает масштаб по умолчанию и добавляет обработчики событий.
 */
const initializeScale = () => {
  applyScale(DEFAULT_SCALE);
  scaleControlSmaller.addEventListener('click', onSmallerButtonClick);
  scaleControlBigger.addEventListener('click', onBiggerButtonClick);
};

/**
 * Сбрасывает обработчики и масштаб при закрытии модального окна,
 * предотвращая "утечку" слушателей событий.
 */
const resetScale = () => {
  scaleControlSmaller.removeEventListener('click', onSmallerButtonClick);
  scaleControlBigger.removeEventListener('click', onBiggerButtonClick);
  // Визуальный сброс масштаба происходит в resetImageInputValue()
};

export { initializeScale, resetScale };
