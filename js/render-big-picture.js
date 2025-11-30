
import { numDecline, toggleClass } from './util.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');
const socialCommentsCount = document.querySelector('.social__comment-count');
const loadButton = document.querySelector('.comments-loader');
const socialCommentTemplate = document.querySelector('.social__comment');

const commentFragment = document.createDocumentFragment();

let commentsCount = COMMENTS_STEP;
let currentComments = [];
let isBigPictureActive = false;

/**
 * Функция переключения видимости модального окна и скролла фона.
 */
function toggleModal() {
  toggleClass(bigPicture, 'hidden');
  toggleClass(document.body, 'modal-open');
}

/**
 * Создает новый элемент комментария на основе шаблона и данных комментария.
 */
const createComment = (comment) => {
  const newComment = socialCommentTemplate.cloneNode(true);
  const avatar = newComment.querySelector('.social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
};

/**
 * Отрисовывает и отображает комментарии для текущей большой фотографии.
 * Показывает комментарии порциями (по 5 штук) и управляет видимостью кнопки "Загрузить еще".
 */
function renderComments() {
  socialComments.replaceChildren();

  const displayedCount = Math.min(commentsCount, currentComments.length);
  socialCommentsCount.innerHTML = `<span class="social__comment-shown-count">${displayedCount}</span> из <span class="social__comment-total-count">${currentComments.length}</span> ${numDecline(currentComments.length, 'комментария', 'комментария', 'комментариев')}`;

  for (let i = 0; i < displayedCount; i++) {
    commentFragment.appendChild(createComment(currentComments[i]));
  }

  if (displayedCount >= currentComments.length) {
    loadButton.classList.add('hidden');
    loadButton.removeEventListener('click', onLoadCommentsButtonClick);
  } else {
    loadButton.classList.remove('hidden');
    loadButton.addEventListener('click', onLoadCommentsButtonClick);
  }

  socialComments.appendChild(commentFragment);
}

/**
 * Создает новый элемент комментария на основе шаблона и данных комментария.
 */
function show(picture) {
  const {url, likes, description} = picture;
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;
}

/**
 * Закрывает модальное окно полноразмерного просмотра фотографии (Big Picture).
 * Сбрасывает счетчик комментариев, удаляет обработчик события с кнопки закрытия
 * и обновляет глобальное состояние активности окна.
 */
function closeBigPicture() {
  commentsCount = COMMENTS_STEP;
  closeButton.removeEventListener ('click', closeBigPicture);
  toggleModal();
  isBigPictureActive = false;
}

/**
 * Обработчик события клика по кнопке "Загрузить еще комментарии".
 * Увеличивает счетчик отображаемых комментариев на заданный шаг
 * и повторно вызывает функцию отрисовки комментариев.
 */
function onLoadCommentsButtonClick() {
  commentsCount += COMMENTS_STEP;
  renderComments();
}

/**
 * Открывает модальное окно полноразмерного просмотра фотографии (Big Picture).
 * Заполняет его данными о фотографии, инициализирует отображение комментариев,
 * добавляет обработчик закрытия и обновляет глобальное состояние активности окна.
 *
 * @param {object} picture - Объект фотографии, которую нужно отобразить.
 */
function renderBigPicture(picture) {
  currentComments = picture.comments.slice();
  show(picture);
  renderComments();
  closeButton.addEventListener ('click', closeBigPicture);
  toggleModal();
  isBigPictureActive = true;
}

/**
 * Проверяет, активно ли в данный момент модальное окно большой фотографии.
 *
 * @returns {boolean} True, если окно открыто, иначе false.
 */
function getIsBigPictureActive() {
  return isBigPictureActive;
}

export { renderBigPicture, closeBigPicture, getIsBigPictureActive };
