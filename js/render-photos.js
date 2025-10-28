
// Получаем шаблон по ID. Находим фрагмент с содержимым template.
const pictureTemplate = document.querySelector('#picture').content;

// Получаем контейнер для отрисовки фотографий
const pictureListElement = document.querySelector('.pictures');

// Создаем DocumentFragment для эффективной вставки элементов
const fragment = document.createDocumentFragment();

const renderPhotos = (photoData) => {
  // Проходим по данным и создаем элементы
  photoData.forEach((photo) => {
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
  pictureListElement.appendChild(fragment);

};

export { renderPhotos};
