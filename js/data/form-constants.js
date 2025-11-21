
// --- Константы валидации ---
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const HASHTAG_REGEX = /^#[a-zа-я0-9]{1,19}$/i;

// --- Сообщения об ошибках для Pristine ---
const ErrorMessages = {
  INVALID_FORMAT: 'Неверный формат хэштега',
  MAX_COUNT: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов`,
  DUPLICATE: 'Хэштеги повторяются',
  COMMENT_LENGTH: `Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`
};

// --- Конфигурации эффектов ---
const EFFECTS_CONFIG = {
  none: {
    filter: 'none', min: 0, max: 100, step: 1, unit: '', isHidden: true,
  },
  chrome: {
    filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '', isHidden: false,
  },
  sepia: {
    filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '', isHidden: false,
  },
  marvin: {
    filter: 'invert', min: 0, max: 100, step: 1, unit: '%', isHidden: false,
  },
  phobos: {
    filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px', isHidden: false,
  },
  heat: {
    filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '', isHidden: false,
  }
};

// Экспортируем все константы, относящиеся к форме
export {
  MAX_HASHTAG_COUNT,
  MAX_COMMENT_LENGTH,
  HASHTAG_REGEX,
  ErrorMessages,
  EFFECTS_CONFIG
};
