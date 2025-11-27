
import { renderPhotos } from './render-photos.js';
import { initializeUploadForm } from './initialize-upload-form.js';
import { initializeGallery } from './initialize-gallery.js';
import { loadData } from './api.js'; // Импортируем функцию, возвращающую промис
import { initializeFilters } from './initialize-filters.js';

/**
 * Функция инициализации приложения с использованием промисов
 */
const init = () => {
  loadData()
    .then((photosData) => {
      // Этот блок выполнится ТОЛЬКО после успешной загрузки данных
      renderPhotos(photosData);
      initializeGallery(photosData);
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
      initializeFilters(photosData);
    })
    .catch((error) => {
      /* eslint-disable no-console */
      // Этот блок выполнится, если в loadData() произошла ошибка (catch сработал)
      console.error('Не удалось инициализировать приложение:', error);
    });
};

// --- Запуск приложения ---
init();

// Инициализируем форму загрузки
initializeUploadForm();
