import { isEscapeKey, toggleClass } from './util.js';

// --- Константы валидации ---
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const HASHTAG_REGEX = /^#[a-zа-я0-9]{1,19}$/i;


// --- Сообщения об ошибках для Pristine ---
const ErrorMessages = {
  INVALID_FORMAT: 'Неверный формат хэштега (начинается с #, буквы/цифры)',
  MAX_COUNT: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов`,
  DUPLICATE: 'Хэштеги повторяются (нечувствительны к регистру)',
  COMMENT_LENGTH: `Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`
};


// --- Основные элементы DOM ---
const uploadPhotoTriggerElement = document.querySelector('.img-upload__input');
const photoEditFormElement = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const closeButtonElement = document.querySelector('.img-upload__cancel');
// submitButton больше не нужен, так как мы не блокируем его

const hashtagInputElement = photoEditFormElement.querySelector('.text__hashtags');
const commentInputElement = photoEditFormElement.querySelector('.text__description');

let pristine; // Переменная для хранения экземпляра Pristine

// --- Вспомогательные функции ---
/**
 * Функция toggleModal, использующая внешние переменные.
 */
const toggleModal = () => {
  toggleClass(photoEditFormElement, 'hidden');
  toggleClass(document.body, 'modal-open');
};

/**
 *  Функция обеспечивает "чистый старт" для формы при каждом её открытии. Сбрасывает значение полей формы.
 */
const resetImageInputValue = () => {
  uploadForm.reset();
  // Сбрасываем состояние валидации Pristine при закрытии формы
  if (pristine) {
    pristine.reset();
  }
};

const isFocusOnInput = () => (
  document.activeElement === hashtagInputElement || document.activeElement === commentInputElement
);


// --- Функции валидации (используются Pristine) ---

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
    const lowerCaseTag = tag.toLowerCase();
    if (uniqueHashtags.has(lowerCaseTag)) {
      return false;
    }
    uniqueHashtags.add(lowerCaseTag);
  }
  return true;
};

/**
* Функция для динамического определения сообщения об ошибке (Аргумент 3 в addValidator).
*/
const getHashtagErrorMessage = (value) => {
  if (value.trim() === '') {
    return ''; // Если поле пустое, не показываем ошибку
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
  return ''; // Если ошибок нет, возвращаем пустую строку (Pristine считает это успехом)
};

const validateComment = (value) => (
  value.length <= MAX_COMMENT_LENGTH
);


// --- Обработчики событий ---

const closeModalHandler = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  toggleModal();
  resetImageInputValue();
  document.removeEventListener('keydown', onEscapeKeyDown);
};

function onEscapeKeyDown(evt) {
  if (isFocusOnInput()) { // <-- Если фокус на инпуте, то условие истинно
    evt.stopPropagation(); // Останавливаем всплытие события Escape
    return; // Выходим из обработчика, не закрывая модалку
  }
  // ... если условие выше ложно, то доходим сюда и закрываем модалку ...
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalHandler();
  }
}

const openModalHandler = () => {
  toggleModal();
  document.addEventListener('keydown', onEscapeKeyDown);
};

/**
 * Обработчик отправки формы (Submit Handler).
 */
const onFormSubmit = (evt) => {
  // Проверяем валидацию с помощью Pristine
  const isValid = pristine.validate();

  if (!isValid) {
    // Если форма невалидна, предотвращаем стандартную отправку
    evt.preventDefault();
  } else {
    /* eslint-disable */
    // Если форма валидна, мы НЕ вызываем preventDefault()
    // и НЕ вызываем closeModalHandler() здесь.
    // Браузер выполнит стандартное действие формы (перейдет по адресу action="...").
    console.log('Форма валидна. Разрешаем стандартную отправку браузером.');
  }
};

// -------------------------------------------------------------------------
// !!! ЭКСПОРТИРУЕМАЯ ФУНКЦИЯ ДЛЯ MAIN.JS !!!
// -------------------------------------------------------------------------

/**
 * Инициализирует логику модального окна загрузки фотографии.
 */
const initializeUploadForm = () => {
  // Инициализируем Pristine здесь
  pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error-text',
    errorClass: 'has-danger',
    successClass: 'has-success',
  });

  // --- Настройка основных обработчиков событий ---
  uploadPhotoTriggerElement.addEventListener('change', openModalHandler);
  closeButtonElement.addEventListener('click', closeModalHandler);
  uploadForm.addEventListener('submit', onFormSubmit);

  // --- Добавление пользовательских валидаторов в Pristine ---

  // Добавляем правило для хэштегов (с разными сообщениями об ошибках)
  pristine.addValidator(
    hashtagInputElement,
    validateHashtags,
    getHashtagErrorMessage,
    1,
    false
  );

  // Добавляем правило для комментария:
  pristine.addValidator(
    commentInputElement,
    validateComment,
    ErrorMessages.COMMENT_LENGTH,
    1,
    false
  );
};

export { initializeUploadForm };
