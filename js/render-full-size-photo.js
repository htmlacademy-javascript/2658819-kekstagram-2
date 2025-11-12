
import { isEscapeKey, numDecline, toggleClass } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loadButton = bigPicture.querySelector('.comments-loader');
const socialCommentTemplate = bigPicture.querySelector('.social__comment');

const commentFragment = document.createDocumentFragment();

let currentComments = [];

/**
 * Переключает видимость большой картинки
 */
const toggleModal = () => {
  toggleClass(bigPicture, 'hidden');
  toggleClass(document.body, 'modal-open');
};

/**
 * Создает один комментарий
 * @param {Object} comment объект с одним комментарием
 * @return {Element}
 */
const createComment = (comment) => {
  const newComment = /** @type {Element} */ socialCommentTemplate.cloneNode(true);
  const avatar = newComment.querySelector('.social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
};

/**
 * Отрисовывает все комментарии сразу
 */
const renderComments = () => {
  socialComments.replaceChildren(); // Очищаем контейнер

  const totalComments = currentComments.length;

  // Обновляем счетчик, показывая общее количество
  socialCommentsCount.innerHTML = `${totalComments} из <span class="comments-count">${totalComments}</span> ${numDecline(totalComments, 'комментария', 'комментария', 'комментариев')}`;

  // Скрываем кнопку загрузки комментариев, так как все уже показаны
  loadButton.classList.add('hidden');

  // Добавляем все комментарии во фрагмент
  currentComments.forEach((comment) => {
    commentFragment.appendChild(createComment(comment));
  });

  socialComments.appendChild(commentFragment);
};

/**
 * Меняет данные большой картинки
 * @param {Object} picture объект с одной картинкой
 */
const show = (picture) => {
  const {url, likes, description} = picture;
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;
};

function onBigPictureEscKeyDown(evt) {
  if(isEscapeKey(evt)){
    closeBigPicture();
  }
}

function closeBigPicture() {
  // Удаляем сброс commentsCount = COMMENTS_STEP;
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
  toggleModal();
}

const onCloseBigPictureClick = () => {
  closeBigPicture();
};

/**
 * Открывает большую картинку
 * @param {Object} picture объект с одной картинкой
 */
const showBigPicture = (picture) => {
  if (!picture || !picture.comments) {
    /* eslint-disable */
    console.error('Ошибка данных: изображение или комментарии не определены.');
    return;
  }

  // Клонируем все комментарии сразу
  currentComments = picture.comments.slice();

  show(picture);
  renderComments();

  document.addEventListener('keydown', onBigPictureEscKeyDown);
  toggleModal();
};

// Удаляем прослушиватель событий loadButton.addEventListener
closeButton.addEventListener ('click', onCloseBigPictureClick);


export { showBigPicture };
