
import { renderPhotos } from './render-photos.js';
import { generatePhotoData } from './generate-photo-data.js';
import {showBigPicture} from './showBigPicture.js';

// 1. Отрисовываем маленькие фотографии, передавая данные
renderPhotos(generatePhotoData);

// 2. Добавляем обработчик клика на контейнер
const galleryContainer = document.querySelector('.pictures');

galleryContainer.addEventListener('click', (e) => {
  // Ищем ближайший родительский элемент с классом .picture (ссылка <a>)
  const currentPhotoElement = e.target.closest('.picture');

  if (currentPhotoElement) {
    e.preventDefault(); // Предотвращаем стандартное действие ссылки (переход по URL)
    // 3. Получаем ID из data-атрибута (он будет строкой)
    const photoId = currentPhotoElement.dataset.pictureId;
    // 4. Находим НУЖНЫЙ ОБЪЕКТ в массиве данных, используя ID
    // ID из data-атрибута — строка, photo.id — число. Приводим типы для сравнения.
    const selectedPhotoData = generatePhotoData.find(
      (photo) => String(photo.id) === String(photoId)
    );
    // 5. Передаем найденный объект в функцию showBigPicture
    if (selectedPhotoData) {
      showBigPicture(selectedPhotoData);
    } else {
      /* eslint-disable */
      console.error('Данные для выбранной фотографии не найдены!');
    }
  }
});

// document.querySelector(".img-upload__form").addEventListener("click", (e) => {
//   e.preventDefault();
//   document.querySelector(".pictures").innerHTML = "";
//   renderPhotos(generatePhotoData.slice(0, 5));
// });

