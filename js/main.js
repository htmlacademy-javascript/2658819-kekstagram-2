
import { renderPhotos } from './render-photos.js';
import { initializeUploadForm, closeModalHandler as closeUploadForm, isMessageActive, closeActiveMessage, isFocusOnInput } from './initialize-upload-form.js';
import { initializeGallery } from './initialize-gallery.js';
import { loadData } from './api.js';
import { initializeFilters } from './initialize-filters.js';
import { closeBigPicture, getIsBigPictureActive } from './render-big-picture.js';
import { isEscapeKey } from './util.js';

// !!! ЦЕНТРАЛЬНЫЙ ДИСПЕТЧЕР ESCAPE !!!
document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    // 1. Приоритет #1: Активно ли сообщение (успех/ошибка)?
    if (isMessageActive()) {
      closeActiveMessage();
      evt.preventDefault();
      return;
    }

    // 2. Если фокус на инпутах, игнорируем Esc.
    if (isFocusOnInput()) {
      return; // Ничего не делаем, форма НЕ закрывается
    }

    // 3. Если форма загрузки открыта, закрываем её.
    const uploadOverlay = document.querySelector('.img-upload__overlay');
    if (uploadOverlay && !uploadOverlay.classList.contains('hidden')) {
      closeUploadForm();
      evt.preventDefault();
      return;
    }

    // 4. Активна ли большая картинка?
    if (getIsBigPictureActive()) {
      closeBigPicture();
      evt.preventDefault();
    }
  }
});


/**
 * Функция инициализации приложения с использованием промисов
 */
const init = () => {
  loadData()
    .then((photosData) => {
      renderPhotos(photosData);
      initializeGallery(photosData);
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
      initializeFilters(photosData);
    })
    .catch((error) => {
      /* eslint-disable no-console */
      console.error('Не удалось инициализировать приложение:', error);
    });
};

// --- Запуск приложения ---
init();
initializeUploadForm();
