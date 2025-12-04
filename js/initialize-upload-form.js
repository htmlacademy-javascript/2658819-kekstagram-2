
import { toggleClass } from './util.js';
import { initializeScale, resetScale } from './scale.js';
import { initializeEffects, resetEffects } from './effects.js';
import { sendData } from './api.js';
import {
  MAX_HASHTAG_COUNT,
  MAX_COMMENT_LENGTH,
  HASHTAG_REGEX,
  ErrorMessages,
  FILE_EXTENSIONS
} from './data/form-constants.js';

// --- Элементы DOM и шаблоны ---
const uploadPhotoTriggerElement = document.querySelector('.img-upload__input');
const photoEditFormElement = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const submitButtonElement = uploadForm.querySelector('.img-upload__submit');
const imagePreviewElement = photoEditFormElement.querySelector('.img-upload__preview img');
const closeButtonElement = photoEditFormElement.querySelector('.img-upload__cancel');
const effectsPreviewElements = photoEditFormElement.querySelectorAll('.effects__preview');

const hashtagInputElement = photoEditFormElement.querySelector('.text__hashtags');
const commentInputElement = photoEditFormElement.querySelector('.text__description');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// --- Внутреннее состояние ---
let pristine;
let activeMessageElement = null;

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
const isFocusOnInput = () => document.activeElement === hashtagInputElement || document.activeElement === commentInputElement;

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
const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

// =====================================================================
// !!! ОСНОВНЫЕ ОБРАБОТЧИКИ СОБЫТИЙ И ЛОГИКА ПРЕДСТАВЛЕНИЯ !!!
// =====================================================================

/**
 * Обработчик закрытия модального окна. Сбрасывает все состояния.
 */
const handleCloseUploadModalClick = () => {
  toggleModal();
  resetScale();
  resetEffects();
  resetImageInputValue();
};

/**
 * Проверяет, активно ли в данный момент какое-либо модальное сообщение (успех/ошибка).
 * @returns {boolean} True, если сообщение отображается, иначе false.
 */
const isMessageActive = () => activeMessageElement !== null;

/**
 * Закрывает активное модальное сообщение (успех/ошибка) и сбрасывает ссылку на него.
 */
const handleCloseActiveMessageClick = () => {
  if (activeMessageElement) {
    activeMessageElement.remove();
    activeMessageElement = null;
  }
};

/**
 * Показывает сообщение на основе переданного шаблона (#success или #error).
 */
const showMessage = (templateElement) => {
  const messageElement = templateElement.cloneNode(true);
  const closeButton = messageElement.querySelector('button');

  closeButton.addEventListener('click', handleCloseActiveMessageClick);

  messageElement.addEventListener('click', (evt) => {
    if (evt.target === messageElement) {
      handleCloseActiveMessageClick();
    }
  });

  document.body.appendChild(messageElement);
  activeMessageElement = messageElement;
};

/**
 * Обрабатывает загруженный файл и показывает его в окне превью.
 */
const renderUploadImage = () => {
  const file = uploadPhotoTriggerElement.files[0];
  if (file) {
    const fileName = file.name.toLowerCase();
    const matches = FILE_EXTENSIONS.some((it) => fileName.endsWith(it));
    if (matches) {
      const imageUrl = URL.createObjectURL(file);
      imagePreviewElement.src = imageUrl;
      effectsPreviewElements.forEach((preview) => {
        preview.style.backgroundImage = `url('${imageUrl}')`;
      });
    }
  }
};

/**
 * Обработчик открытия модального окна. Инициализирует состояния.
 */
const handleOpenUploadModalChange = () => {
  renderUploadImage();
  toggleModal();
  initializeScale();
  initializeEffects();
};

/**
 * Управляет состоянием кнопки отправки формы (disabled/enabled) для UX.
 */
const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled ? 'Публикую...' : 'Опубликовать';
};

/**
 * Обработчик отправки формы. Асинхронная функция.
 */
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    toggleSubmitButton(true);

    sendData(new FormData(uploadForm))
      .then(() => {
        showMessage(successTemplate);
        handleCloseUploadModalClick();
      })
      .catch(() => {
        showMessage(errorTemplate);
      })
      .finally(() => {
        toggleSubmitButton(false);
      });
  }
};

/**
 * Инициализирует модуль загрузки и редактирования фотографий.
 * Устанавливает валидацию Pristine, привязывает обработчики событий
 * к триггеру загрузки файла, кнопке закрытия формы и отправке формы.
 */
const initializeUploadForm = () => {
  pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
    successClass: 'has-success',
  });
  uploadPhotoTriggerElement.addEventListener('change', handleOpenUploadModalChange);
  closeButtonElement.addEventListener('click', handleCloseUploadModalClick);
  uploadForm.addEventListener('submit', handleFormSubmit);
  pristine.addValidator(hashtagInputElement, validateHashtags, getHashtagErrorMessage, 1, false);
  pristine.addValidator(commentInputElement, validateComment, ErrorMessages.COMMENT_LENGTH, 1, false);

  hashtagInputElement.addEventListener('input', () => {
    pristine.validate(hashtagInputElement);
  });
  commentInputElement.addEventListener('input', () => {
    pristine.validate(commentInputElement);
  });
};

export { initializeUploadForm, handleCloseUploadModalClick, isMessageActive, handleCloseActiveMessageClick , isFocusOnInput };
