
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
 * Применяет выбранный эффект к изображению через CSS-класс.
 */
const applyEffect = () => {
  const effectName = currentEffect.name;
  imagePreviewElement.className = '';
  imagePreviewElement.classList.add(`effects__preview--${effectName}`);
};

/**
 * Обновляет CSS-фильтр изображения и скрытое поле значения.
 * @param {number} value Текущее значение слайдера.
 */
const updateEffect = (value) => {
  effectLevelValueInput.value = value;

  if (currentEffect.filter === 'none') {
    imagePreviewElement.style.filter = '';
  } else {
    imagePreviewElement.style.filter = `${currentEffect.filter}(${value}${currentEffect.unit})`;
  }
};

/**
 * Обработчик события 'update' слайдера noUiSlider.
 */
const handleSliderUpdate = () => {
  const sliderValue = sliderInstance.get();
  updateEffect(parseFloat(sliderValue));
};

/**
 * Создает или обновляет настройки слайдера в зависимости от выбранного эффекта.
 */
const updateSliderConfig = () => {
  if (currentEffect.isHidden) {
    effectLevelContainer.classList.add('hidden');
  } else {
    effectLevelContainer.classList.remove('hidden');
  }
  const options = {
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
    connect: 'lower',
    format: {
      // eslint-disable-next-line func-names
      to: (value) => value,
      // eslint-disable-next-line func-names
      from: (value) => parseFloat(value),
    },
  };

  if (sliderInstance === null) {
    sliderInstance = noUiSlider.create(effectLevelSlider, options);
    sliderInstance.on('update', handleSliderUpdate);
  } else {
    sliderInstance.updateOptions(options);
  }
};

/**
 * Обработчик изменения радиокнопок эффектов.
 */
const handleEffectsChange = (evt) => {
  const newEffectName = evt.target.value;
  currentEffect = EFFECTS_CONFIG[newEffectName];
  applyEffect();
  updateSliderConfig();
};


/**
 * Инициализирует логику эффектов и слайдера при открытии формы.
 */
const initializeEffects = () => {
  currentEffect = EFFECTS_CONFIG.none;
  applyEffect();
  updateSliderConfig();
  effectsListElement.addEventListener('change', handleEffectsChange);
};

/**
 * Сбрасывает эффекты и удаляет обработчики при закрытии формы.
 */
const resetEffects = () => {
  effectsListElement.removeEventListener('change', handleEffectsChange);
  imagePreviewElement.style.filter = '';
  imagePreviewElement.className = '';
  if (sliderInstance) {
    sliderInstance.destroy();
    sliderInstance = null;
  }
};

export { initializeEffects, resetEffects };
