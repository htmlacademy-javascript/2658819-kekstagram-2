
const pictureTemplate = document.querySelector('#picture').content;

const pictureListElement = document.querySelector('.pictures');

const fragment = document.createDocumentFragment();

const renderPhotos = (photoData) => {
  photoData.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');
    imgElement.src = photo.url;
    imgElement.alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture').dataset.pictureId = photo.id;
    fragment.appendChild(pictureElement);
  });
  pictureListElement.appendChild(fragment);
};

export { renderPhotos };
