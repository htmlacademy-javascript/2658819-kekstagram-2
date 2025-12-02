
import { renderBigPicture } from './render-big-picture.js';

const initializeGallery = (photosData) => {
  const galleryContainer = document.querySelector('.pictures');

  galleryContainer.addEventListener('click', (e) => {
    const currentPhotoElement = e.target.closest('.picture');

    if (currentPhotoElement) {
      e.preventDefault();
      const photoId = currentPhotoElement.dataset.pictureId;
      const selectedPhotoData = photosData.find(
        (photo) => String(photo.id) === String(photoId)
      );

      if (selectedPhotoData) {
        renderBigPicture(selectedPhotoData);
      }
    }
  });
};

export { initializeGallery };
