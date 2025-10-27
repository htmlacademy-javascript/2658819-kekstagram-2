
import { generatePhotoData } from './generate-photo-data.js';
/* eslint-disable */
console.log(generatePhotoData);
// Получаем шаблон по ID. Находим фрагмент с содержимым template.
const pictureTemplate = document.querySelector('#picture').content;

// Получаем контейнер для отрисовки фотографий
const picturesContainer = document.querySelector('.pictures');

// Создаем DocumentFragment для эффективной вставки элементов
const fragment = document.createDocumentFragment();

// Проходим по данным и создаем элементы
generatePhotoData.forEach((photo) => {
  // Клонируем содержимое шаблона (глубокое клонирование, включая дочерние элементы)
  const pictureElement = pictureTemplate.cloneNode(true);

  // Находим элементы с нужным классом внутри клонированного шаблона pictureElement и заполняем их данными из объекта photo
  const imgElement = pictureElement.querySelector('.picture__img');
  imgElement.src = photo.url;
  imgElement.alt = photo.description;
  // Присваиваем текстовому содержимому значение свойства likes и comments из объекта photo
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;

  // Добавляем заполненный элемент во фрагмент
  fragment.appendChild(pictureElement);

});

// Отрисовываем все сгенерированные DOM-элементы за один раз
picturesContainer.appendChild(fragment);

export { picturesContainer };
