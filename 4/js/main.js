
const arrayLength = 25;
const id = Array.from({ length: 1000 }, (_, index) => index + 1);

/* eslint-disable */ //console.log(id);


const url = Array.from({length: arrayLength}, (_, i) => `photos/${i + 1}.jpg`);
//console.log(url);


const descriptionList = [
  'Селфи (фотография самого себя)',
  'Пейзаж (природа, город)',
  'Животное (изображение питомца или дикого зверя)',
  'Предмет (фото любимой вещи)',
  'Мем (смешная картинка)',
  'Коллаж (сочетание нескольких элементов)',
  'Арт (рисованное изображение)'
];

// Генерируем массив из 25 элементов
const description = Array.from({ length: arrayLength }, () => {
  // Выбираем случайный индекс из массива description
  const randomIndex = Math.floor(Math.random() * descriptionList.length);
  // Возвращаем элемент с этим случайным индексом
  return descriptionList[randomIndex];
});

//console.log(description);


const min = 15;
const max = 200;

// Array.from({ length: arrayLength }, mapFn) создает массив заданной длины,
// а затем применяет mapFn к каждому элементу.
const likes = Array.from({ length: arrayLength }, () => {
  // mapFn генерирует и возвращает случайное число
  return Math.floor(Math.random() * (max - min + 1)) + min;
});

//console.log(likes);


const messageList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const message = Array.from({ length: arrayLength }, () => {
  // Выбираем случайный индекс из массива description
  const randomIndex = Math.floor(Math.random() * messageList.length);
  // Возвращаем элемент с этим случайным индексом
  return messageList[randomIndex];
});

//console.log(message);



const randomUniqueElements = id
  .slice() // Создаём копию, чтобы не изменять оригинал
  .sort(() => Math.random() - 0.5) // Случайная сортировка
  .slice(0, 25); // Извлекаем первые 25 элементов

//console.log(randomUniqueElements);

const avatars = Array.from({ length: arrayLength }, () => {
  // Генерируем случайное число от 1 до 6
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  // Возвращаем сформированную строку для каждого элемента
  return `img/avatar-${randomNumber}.svg`;
});

const namesList = [
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

const randomName = namesList
  .slice() // Создаём копию, чтобы не изменять оригинал
  .sort(() => Math.random() - 0.5) // Случайная сортировка
  .slice(0, 25); // Извлекаем первые 25 элементов


const comments = Array.from({ length: arrayLength }, () => ({}));
comments.forEach((obj, index) => {
  obj.avatars = avatars[index];
  obj.id = randomUniqueElements[index];
  obj.message = message[index];
  obj.name = randomName[index];
});


const targetObjects = Array.from({ length: arrayLength }, () => ({}));

targetObjects.forEach((obj, index) => {
    obj.id = id[index];
    obj.url = url[index];
    obj.description = description[index];
    obj.likes = likes[index];
    obj.comments = comments[index];
});

console.log(targetObjects);
