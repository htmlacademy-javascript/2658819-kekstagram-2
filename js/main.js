
import { renderPhotos } from './render-photos.js';
import { generatePhotoData } from './generate-photo-data.js';
const pictureListElement = document.querySelector('.pictures');
const pictureListElementSecond = document.querySelector('.pictures');

renderPhotos(pictureListElement, generatePhotoData);
renderPhotos(pictureListElementSecond, generatePhotoData.slice(0, 5));

// document.querySelector(".img-upload__form").addEventListener("click", (e) => {
//   e.preventDefault();
//   document.querySelector(".pictures").innerHTML = "";
//   renderPhotos(generatePhotoData.slice(0, 5));
// });

