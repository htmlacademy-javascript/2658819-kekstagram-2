
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

const generatePhotoData = Array.from({ length: ARRAY_LENGTH }, (obj, index) => ({
  id : index + 1,
  url : `photos/${index + 1}.jpg`,
  description : getArrayElement(DESCRIPTIONS),
  likes : getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments : getComments()
}));

export { generatePhotoData };
