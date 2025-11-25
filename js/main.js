
import { renderPhotos } from './render-photos.js';
import { initializeUploadForm } from './initialize-upload-form.js';
import { initializeGallery } from './initialize-gallery.js';
import { loadData } from './api.js'; // Импортируем функцию, возвращающую промис

/**
 * Функция инициализации приложения с использованием промисов
 */
const init = () => {
  loadData()
    .then((photosData) => {
      // Этот блок выполнится ТОЛЬКО после успешной загрузки данных
      renderPhotos(photosData);
      initializeGallery(photosData);
      /* eslint-disable no-console */
      console.log('Данные загружены и приложение инициализировано.');
    })
    .catch((error) => {
      // Этот блок выполнится, если в loadData() произошла ошибка (catch сработал)
      console.error('Не удалось инициализировать приложение:', error);
      // Модуль API уже показал сообщение об ошибке, здесь можно больше ничего не делать
    });
};

// --- Запуск приложения ---
init();

// Инициализируем форму загрузки
initializeUploadForm();
