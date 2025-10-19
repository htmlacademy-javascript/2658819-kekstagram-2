
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

/* eslint-disable */

// Генерируем массив из 25 элементов
const description = Array.from({ length: ARRAY_LENGTH }, () => {
  // Выбираем случайный индекс из массива description
  const randomIndex = Math.floor(Math.random() * DESCRIPTIONS.length);
  // Возвращаем элемент с этим случайным индексом
  return DESCRIPTIONS[randomIndex];
});

//console.log(description);
const getRandomInteger = ( min, max ) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log (getRandomInteger(15, 200))


const message = Array.from({ length: ARRAY_LENGTH }, () => {
  // Выбираем случайный индекс из массива description
  const randomIndex = Math.floor(Math.random() * MESSAGES.length);
  // Возвращаем элемент с этим случайным индексом
  return MESSAGES[randomIndex];
});



const randomName = NAMES
  .slice() // Создаём копию, чтобы не изменять оригинал
  .sort(() => Math.random() - 0.5) // Случайная сортировка
  .slice(0, ARRAY_LENGTH ); // Извлекаем первые 25 элементов


const allComments = Array.from({ length: 30*25 }, () => ({}));
allComments.forEach((obj, index) => {
  obj.avatars = `img/avatar-${getRandomInteger(1, 6)}.svg`;
  obj.id = getRandomInteger(0, 30*25);
  obj.message = message[index];
  obj.name = randomName[index];
});

//const comments = allComments
   //.slice() // Создаём копию, чтобы не изменять оригинал
   //.sort(() => Math.random() - 0.5) // Случайная сортировка
   //.slice(0, 30);



const targetObjects = Array.from({ length: ARRAY_LENGTH }, () => ({}));

targetObjects.forEach((obj, index) => {
    obj.id = index + 1;
    obj.url = `photos/${index + 1}.jpg`;
    obj.description = description[index];
    obj.likes = getRandomInteger(15, 200);
    obj.comments =  allComments.slice()
                           .sort(() => Math.random() - 0.5)
                           .slice(0, 30);
});

console.log(targetObjects);
