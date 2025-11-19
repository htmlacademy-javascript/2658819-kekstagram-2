
import { isEscapeKey, toggleClass } from './util.js';

// --- Основные элементы DOM ---
const uploadPhotoTriggerElement = document.querySelector('.img-upload__input');
const photoEditFormElement = document.querySelector('.img-upload__overlay');
const closeButtonElement = document.querySelector('.img-upload__cancel');


/**
 * Ваша функция toggleModal, использующая внешние переменные.
 */
const toggleModal = () => {
  toggleClass(photoEditFormElement, 'hidden');
  toggleClass(document.body, 'modal-open');
};


/**
 * Сбрасывает значение input[type="file"].
 */
const resetImageInputValue = () => {
  uploadPhotoTriggerElement.value = null;
};


/**
 * Обработчик, который срабатывает при открытии модального окна (после выбора файла).
 */
const openModalHandler = () => {
  // В данном случае preventDefault() не нужен, событие change не имеет стандартного действия
  toggleModal();
  document.addEventListener('keydown', onEscapeKeyDown);
};


/**
 * Обработчик, который срабатывает при закрытии модального окна (через кнопку или Escape).
 * @param {Event} [evt] Объект события, может отсутствовать, если вызвано из openModalHandler
 */
const closeModalHandler = (evt) => {
  // Предотвращаем стандартное действие (например, отправку формы, если кнопка внутри формы)
  if (evt) {
    evt.preventDefault();
  }
  toggleModal();
  // Логика, которая происходит только при закрытии:
  resetImageInputValue();
  document.removeEventListener('keydown', onEscapeKeyDown);
};


/**
 * Обработчик нажатия клавиши Escape.
 * @param {KeyboardEvent} evt
 */
function onEscapeKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalHandler();
  }
}

// --- Настройка основных обработчиков событий ---
uploadPhotoTriggerElement.addEventListener('change', openModalHandler);
closeButtonElement.addEventListener('click', closeModalHandler);

