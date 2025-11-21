
import { EFFECTS_CONFIG } from './data/form-constants.js';

// --- DOM элементы ---
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValueInput = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectsListElement = document.querySelector('.img-upload__effects');

let currentEffect = EFFECTS_CONFIG.none;
let sliderInstance = null;

/**
 * Обновляет CSS-фильтр изображения и скрытое поле значения.
 * @param {number} value Текущее значение слайдера.
 */
const updateEffect = (value) => {
  effectLevelValueInput.value = value;

  if (currentEffect.filter === 'none') {
    imagePreviewElement.style.filter = '';
  } else {
    // Применяем filter: name(value + unit)
    imagePreviewElement.style.filter = `${currentEffect.filter}(${value}${currentEffect.unit})`;
  }
};

/**
 * Обработчик события 'update' слайдера noUiSlider.
 */

const onSliderUpdate = () => {
  // Получаем текущее значение слайдера напрямую как число/строку
  const sliderValue = sliderInstance.get();

  // Убеждаемся, что передаем число
  updateEffect(parseFloat(sliderValue));
};

/**
 * Создает или обновляет настройки слайдера в зависимости от выбранного эффекта.
 */
const updateSliderConfig = () => {
  // Скрываем контейнер слайдера, если эффект 'none'
  if (currentEffect.isHidden) {
    effectLevelContainer.classList.add('hidden');
  } else {
    effectLevelContainer.classList.remove('hidden');
  }

  // Настройки для noUiSlider
  const options = {
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max, // Сбрасываем уровень до начального состояния (100% интенсивности)
    step: currentEffect.step,
    connect: 'lower',
    // format для корректного считывания значений с плавающей точкой
    format: {
      to: (value) => value,
      from: (value) => parseFloat(value),
    },
  };

  if (sliderInstance === null) {
    // Если слайдер еще не создан, инициализируем его
    sliderInstance = noUiSlider.create(effectLevelSlider, options);
    // Подписываемся на событие обновления слайдера
    sliderInstance.on('update', onSliderUpdate);
  } else {
    // Если слайдер уже существует, просто обновляем его настройки (range, start, step)
    sliderInstance.updateOptions(options);
  }
};

/**
 * Обработчик изменения радиокнопок эффектов.
 */
const onEffectsChange = (evt) => {
  // Определяем новый эффект из value выбранной радиокнопки
  const newEffectName = evt.target.value;
  currentEffect = EFFECTS_CONFIG[newEffectName];

  // Обновляем настройки слайдера и сбрасываем уровень эффекта
  updateSliderConfig();
};


/**
 * Инициализирует логику эффектов и слайдера при открытии формы.
 */
const initializeEffects = () => {
  // Устанавливаем эффект по умолчанию ('none')
  currentEffect = EFFECTS_CONFIG.none;
  updateSliderConfig(); // Скрывает слайдер по умолчанию

  // Добавляем общий обработчик события 'change' на контейнер списка эффектов (делегирование)
  effectsListElement.addEventListener('change', onEffectsChange);
};

/**
 * Сбрасывает эффекты и удаляет обработчики при закрытии формы.
 */
const resetEffects = () => {
  // Удаляем обработчик событий
  effectsListElement.removeEventListener('change', onEffectsChange);

  // Удаляем CSS-фильтр с изображения
  imagePreviewElement.style.filter = '';

  // Удаляем экземпляр слайдера из DOM и памяти, если он был создан
  if (sliderInstance) {
    sliderInstance.destroy();
    sliderInstance = null;
  }
};

export { initializeEffects, resetEffects };
