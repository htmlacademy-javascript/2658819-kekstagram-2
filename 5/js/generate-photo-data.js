
import { DESCRIPTIONS, NAMES, MESSAGES } from './data.js';
import { getRandomInteger, getArrayElement } from './util.js';

const ARRAY_LENGTH = 25;

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

const MAX_COMMENTS = 30;

let continuousCommentsNum = 1;

const getComments = () => {
  const numberOfComments = getRandomInteger(0, MAX_COMMENTS);
  if (numberOfComments > 0) {
    const allComments = Array.from({ length: numberOfComments }, () => ({}));
    allComments.forEach((obj) => {
      obj.id = continuousCommentsNum;
      continuousCommentsNum++;
      obj.avatar = `img/avatar-${getRandomInteger(MIN_AVATAR, MAX_AVATAR)}.svg`;
      obj.message = getArrayElement(MESSAGES);
      obj.name = getArrayElement(NAMES);
    });
    return allComments;
  }
  return [];
};

const generatePhotoData = Array.from({ length: ARRAY_LENGTH }, () => ({}));

generatePhotoData.forEach((obj, index) => {
  obj.id = index + 1;
  obj.url = `photos/${index + 1}.jpg`;
  obj.description = getArrayElement(DESCRIPTIONS);
  obj.likes = getRandomInteger(MIN_LIKES, MAX_LIKES);
  obj.comments = getComments();
});

/* eslint-disable */
// console.log(generatePhotoData);
// console.log(generatePhotoData[24].comments);

export { generatePhotoData };
