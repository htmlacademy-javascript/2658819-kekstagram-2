
import { renderPhotos } from './render-photos.js';
import { generatePhotoData } from './generate-photo-data.js';
import { initializeUploadForm } from './initialize-upload-form.js';
import { initializeGallery } from './initialize-gallery.js';

// 1. Отрисовываем маленькие фотографии, передавая данные
const photosData = generatePhotoData;
renderPhotos(photosData);

initializeUploadForm();

// 2. Инициализируем логику галереи, передавая ей данные
initializeGallery(photosData); // !!! Вызываем функцию из нового модуля !!!
