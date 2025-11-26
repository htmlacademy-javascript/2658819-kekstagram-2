
import { isEscapeKey, toggleClass } from './util.js';
import { initializeScale, resetScale } from './scale.js';
import { initializeEffects, resetEffects } from './effects.js';
import { sendData } from './api.js';

import {
  MAX_HASHTAG_COUNT,
  MAX_COMMENT_LENGTH,
  HASHTAG_REGEX,
  ErrorMessages
} from './data/form-constants.js';

// --- Элементы DOM и шаблоны ---
const uploadPhotoTriggerElement = document.querySelector('.img-upload__input');
const photoEditFormElement = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const closeButtonElement = document.querySelector('.img-upload__cancel');
const submitButtonElement = uploadForm.querySelector('.img-upload__submit');

const hashtagInputElement = photoEditFormElement.querySelector('.text__hashtags');
const commentInputElement = photoEditFormElement.querySelector('.text__description');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// --- Внутреннее состояние ---
let pristine;
let activeMessageElement = null; // Отслеживает, активно ли сейчас сообщение

// --- Вспомогательные функции Контроллера (Перенесены ВВЕРХ) ---
/**
 * Функция переключения видимости модального окна и скролла фона.
 */
const toggleModal = () => {
  toggleClass(photoEditFormElement, 'hidden');
  toggleClass(document.body, 'modal-open');
};

/**
 * Сбрасывает значение input[type="file"], очищает поля формы и ошибки Pristine.
 */
const resetImageInputValue = () => {
  uploadForm.reset();
  if (pristine) {
    pristine.reset();
  }
};

/**
 * Проверяет, находится ли фокус ввода на полях хэштегов или комментария.
 * @returns {boolean} True, если фокус находится на поле ввода
 */
const isFocusOnInput = () => (
  document.activeElement === hashtagInputElement || document.activeElement === commentInputElement
);

// --- Функции Валидации (Разделенная логика)  ---

/**
 * Функция валидации хэштегов. Возвращает true/false для Pristine.
 */
const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }
  const hashtags = value.trim().split(/\s+/).filter((tag) => tag.length > 0);
  if (hashtags.length > MAX_HASHTAG_COUNT) {
    return false;
  }
  const uniqueHashtags = new Set();
  for (const tag of hashtags) {
    if (!HASHTAG_REGEX.test(tag)) {
      return false;
    }
    if (uniqueHashtags.has(tag.toLowerCase())) {
      return false;
    }
    uniqueHashtags.add(tag.toLowerCase());
  }
  return true;
};

/**
 * Функция, которая возвращает сообщение об ошибке для Pristine.
 */
const getHashtagErrorMessage = (value) => {
  if (value.trim() === '') {
    return '';
  }
  const hashtags = value.trim().split(/\s+/).filter((tag) => tag.length > 0);
  if (hashtags.length > MAX_HASHTAG_COUNT) {
    return ErrorMessages.MAX_COUNT;
  }
  const uniqueHashtags = new Set();
  for (const tag of hashtags) {
    if (!HASHTAG_REGEX.test(tag)) {
      return ErrorMessages.INVALID_FORMAT;
    }
    const lowerCaseTag = tag.toLowerCase();
    if (uniqueHashtags.has(lowerCaseTag)) {
      return ErrorMessages.DUPLICATE;
    }
    uniqueHashtags.add(lowerCaseTag);
  }
  return '';
};

/**
* Валидирует длину комментария.
*/
const validateComment = (value) => (
  value.length <= MAX_COMMENT_LENGTH
);

// --- Основные Обработчики Событий Контроллера  ---

/**
 * Обработчик закрытия модального окна. Сбрасывает все состояния.
 */
function closeModalHandler() {
  toggleModal();
  resetScale();
  resetEffects();
  resetImageInputValue();
}

/**
 * Глобальный обработчик нажатий клавиш (вешается на document).
 */
function onEscapeKeyDown(evt) {
  if (isFocusOnInput()) {
    evt.stopPropagation();
    return;
  }
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalHandler();
  }
}

/**
 * Обработчик открытия модального окна. Инициализирует состояния.
 */
const openModalHandler = () => {
  toggleModal();
  initializeScale();
  initializeEffects();
};


// --- View Logic (Показ/Скрытие сообщений об отправке) ---

/**
 * Удаляет активное сообщение (успех/ошибка) из DOM и убирает обработчик Esc.
 */
const removeMessage = () => {
  if (activeMessageElement) {
    const isSuccess = activeMessageElement.classList.contains('success');

    activeMessageElement.remove();
    activeMessageElement = null;
    document.removeEventListener('keydown', onMessageEscapeKeydown);

    if (isSuccess) {
      closeModalHandler();
    } else {
      document.addEventListener('keydown', onEscapeKeyDown);
    }
  }
};

/**
 * Обработчик нажатия Esc для закрытия сообщения об отправке.
 */
function onMessageEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage();
  }
}

/**
 * Показывает сообщение на основе переданного шаблона (#success или #error).
 */
const showMessage = (templateElement) => {
  const messageElement = templateElement.cloneNode(true);
  const closeButton = messageElement.querySelector('button');

  closeButton.addEventListener('click', removeMessage);

  messageElement.addEventListener('click', (evt) => {
    if (evt.target === messageElement) {
      removeMessage();
    }
  });

  document.addEventListener('keydown', onMessageEscapeKeydown);
  document.body.appendChild(messageElement);
  activeMessageElement = messageElement;

  if (messageElement.classList.contains('success')) {
    document.addEventListener('keydown', onEscapeKeyDown);
  }
};


/**
 * Управляет состоянием кнопки отправки формы (disabled/enabled) для UX.
 */
const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled ? 'Публикую...' : 'Опубликовать';
};

/**
 * Обработчик отправки формы (Submit Handler). Асинхронная функция.
 */
const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    toggleSubmitButton(true);

    sendData(new FormData(uploadForm))
      .then(() => {
        showMessage(successTemplate);
      })
      .catch(() => {
        showMessage(errorTemplate);
      })
      .finally(() => {
        toggleSubmitButton(false);
      });
  }
};


// -------------------------------------------------------------------------
// !!! ЭКСПОРТИРУЕМАЯ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ !!!
// -------------------------------------------------------------------------

const initializeUploadForm = () => {
  pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
    successClass: 'has-success',
  });

  // Все обработчики теперь определены выше
  uploadPhotoTriggerElement.addEventListener('change', openModalHandler);
  closeButtonElement.addEventListener('click', closeModalHandler);
  uploadForm.addEventListener('submit', onFormSubmit);

  pristine.addValidator(
    hashtagInputElement,
    validateHashtags,
    getHashtagErrorMessage,
    1,
    false
  );

  pristine.addValidator(
    commentInputElement,
    validateComment,
    ErrorMessages.COMMENT_LENGTH,
    1,
    false
  );
};


export { initializeUploadForm };
