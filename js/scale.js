
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
  // Обновляем текстовое поле формы, которое доступно только для чтения (readonly).
  // Доступ к свойству value HTML-элемента <input type="text"> для обновления его содержимого

  const formattedValue = `${value}%`;

  // --- МЕНЯЕТ ТЕКУЩЕЕ СВОЙСТВО (ОСНОВНАЯ ЛОГИКА) ---
  scaleControlValue.value = formattedValue;

  // --- ПРИНУДИТЕЛЬНО МЕНЯЕТ HTML-АТРИБУТ (ДЛЯ DEVTOOLS) ---
  scaleControlValue.setAttribute('value', formattedValue);
  // Применяем CSS transform: scale() к элементу изображения.
  // Делим значение на 100, чтобы получить десятичную дробь (например, 0.75).
  imagePreviewElement.style.transform = `scale(${value / 100})`;
};

/**
 * Обработчик кнопки "Уменьшить".
 */
const onSmallerButtonClick = () => {
  // Получаем текущее числовое значение масштаба, убирая знак '%' с помощью parseInt
  const currentValue = parseInt(scaleControlValue.value, 10);

  let newValue = currentValue - SCALE_STEP;

  // Ограничиваем значение минимально допустимым порогом
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }

  applyScale(newValue);
};

/**
 * Обработчик кнопки "Увеличить".
 */
const onBiggerButtonClick = () => {
  // Получаем текущее числовое значение масштаба
  const currentValue = parseInt(scaleControlValue.value, 10);

  let newValue = currentValue + SCALE_STEP;

  // Ограничиваем значение максимально допустимым порогом
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
  // Устанавливаем начальный масштаб при открытии формы
  applyScale(DEFAULT_SCALE);

  // Добавляем обработчики событий на кнопки
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
