
const ARRAY_LENGTH = 25;

const DESCRIPTIONS = [
  'Селфи (фотография самого себя)',
  'Пейзаж (природа, город)',
  'Животное (изображение питомца или дикого зверя)',
  'Предмет (фото любимой вещи)',
  'Мем (смешная картинка)',
  'Коллаж (сочетание нескольких элементов)',
  'Арт (рисованное изображение)'
];

const NAMES = [
  'Олег',
  'Хлоя',
  'Лео',
  'Изабелла',
  'Оливер',
  'София',
  'Джеймс',
  'Миа',
  'Ноа',
  'Эмили',
  'Бен',
  'Лина',
  'Маркус',
  'Сара',
  'Антон',
  'Ханна',
  'Крис',
  'Лея',
  'Адам',
  'Елена',
  'Эрик',
  'Нина',
  'Павел',
  'Феликс',
  'Джина'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

const MAX_COMMENTS = 30;

const getDescription = () => {
  const randomIndex = Math.floor(Math.random() * DESCRIPTIONS.length);
  return DESCRIPTIONS[randomIndex];
};

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getMessage = () => {
  const randomIndex = Math.floor(Math.random() * MESSAGES.length);
  return MESSAGES[randomIndex];
};

const getName = () => {
  const randomIndex = Math.floor(Math.random() * NAMES.length);
  return NAMES[randomIndex];
};

let continuousCommentsNum = 1;

const getComments = () => {
  const numberOfComments = getRandomInteger(0, MAX_COMMENTS);
  if (numberOfComments > 0) {
    const allComments = Array.from({ length: numberOfComments }, () => ({}));
    allComments.forEach((obj) => {
      obj.avatar = `img/avatar-${getRandomInteger(MIN_AVATAR, MAX_AVATAR)}.svg`;
      obj.id = continuousCommentsNum;
      continuousCommentsNum++;
      obj.message = getMessage();
      obj.name = getName();
    });
    return allComments;
  }
  return [];
};

const targetPhotoObjects = Array.from({ length: ARRAY_LENGTH }, () => ({}));

targetPhotoObjects.forEach((obj, index) => {
  obj.id = index + 1;
  obj.url = `photos/${index + 1}.jpg`;
  obj.description = getDescription();
  obj.likes = getRandomInteger(MIN_LIKES, MAX_LIKES);
  obj.comments = getComments();
});
/* eslint-disable */
console.log(targetPhotoObjects);
console.log(targetPhotoObjects[24].comments);
