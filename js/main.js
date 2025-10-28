
import { renderPhotos } from './render-photos.js';
import { generatePhotoData } from './generate-photo-data.js';

renderPhotos(generatePhotoData);

// document.querySelector(".img-upload__form").addEventListener("click", (e) => {
//   e.preventDefault();
//   document.querySelector(".pictures").innerHTML = "";
//   renderPhotos(generatePhotoData.slice(0, 5));
// });
