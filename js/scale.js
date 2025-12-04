
// --- Константы масштабирования ---
const SCALE_STEP = 25; // Шаг изменения масштаба
const MIN_SCALE = 25; // Минимальный масштаб в процентах
const MAX_SCALE = 100; // Максимальный масштаб в процентах
const DEFAULT_SCALE = 100; // Масштаб по умолчанию

// --- DOM элементы ---
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

/**
 * Устанавливает значение и атрибут value для элемента поля масштаба.
 * @param {HTMLElement} element - Элемент поля ввода масштаба.
 * @param {string} value - Форматированное строковое значение (например, "75%").
 */
const setValueAndAttribute = (element, value) => {
  element.value = value;
  element.setAttribute('value', value);
};

/**
 * Обновляет масштаб изображения и значение в поле ввода.
 * @param {number} value - Новый процент масштаба (25, 50, 75, 100).
 */
const updateScale = (value) => {
  const formattedValue = `${value}%`;
  setValueAndAttribute(scaleControlValue, formattedValue);
  imagePreviewElement.style.transform = `scale(${value / 100})`;
};

/**
 * Обработчик клика по кнопке уменьшения масштаба.
 */
const handleSmallerButtonClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newValue = Math.max(MIN_SCALE, currentValue - SCALE_STEP);
  updateScale(newValue);
};

/**
 * Обработчик клика по кнопке увеличения масштаба.
 */
const handleBiggerButtonClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newValue = Math.min(MAX_SCALE, currentValue + SCALE_STEP);
  updateScale(newValue);
};

/**
 * Сбрасывает масштаб изображения к значению по умолчанию (100%).
 */
const resetScale = () => {
  updateScale(DEFAULT_SCALE);
};

/**
 * Инициализирует обработчики событий кнопок масштабирования
 */
const initializeScale = () => {
  smallerButton.addEventListener('click', handleSmallerButtonClick);
  biggerButton.addEventListener('click', handleBiggerButtonClick);
  resetScale(); // Устанавливаем масштаб по умолчанию при открытии формы
};

export { initializeScale, resetScale };
