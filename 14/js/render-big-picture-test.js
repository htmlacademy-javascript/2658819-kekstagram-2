
import { isEscapeKey, numDecline, toggleClass } from './util.js';

// Количество комментариев, загружаемых за один раз
const COMMENTS_STEP = 5;

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

let commentsCount = COMMENTS_STEP;
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
 * Отрисовывает комментарии внутри большой картинки
 */
const renderComments = () => {
  socialComments.replaceChildren();

  // Обновление количества отображаемых комментариев, если их меньше чем COMMENTS_STEP
  const displayedCount = Math.min(commentsCount, currentComments.length);
  socialCommentsCount.innerHTML = `${displayedCount} из <span class="comments-count">${currentComments.length}</span> ${numDecline(currentComments.length, 'комментария', 'комментария', 'комментариев')}`;

  for (let i = 0; i < displayedCount; i++) {
    commentFragment.appendChild(createComment(currentComments[i]));
  }

  // Скрытие кнопки загрузки, если все комментарии показаны
  if (displayedCount >= currentComments.length) {
    loadButton.classList.add('hidden');
  } else {
    loadButton.classList.remove('hidden');
  }

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

const onLoadCommentsButtonClick = () => {
  commentsCount += COMMENTS_STEP;
  renderComments();
};

function onBigPictureEscKeyDown(evt) {
  if(isEscapeKey(evt)){
    closeBigPicture();
  }
}

function closeBigPicture() {
  commentsCount = COMMENTS_STEP; // Сброс счетчика при закрытии
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
const renderBigPictureTest = (picture) => {

  currentComments = picture.comments.slice();

  show(picture);

  renderComments();

  document.addEventListener('keydown', onBigPictureEscKeyDown);

  toggleModal();
};

loadButton.addEventListener('click', onLoadCommentsButtonClick);
closeButton.addEventListener ('click', onCloseBigPictureClick);

export { renderBigPictureTest };

