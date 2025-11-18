
import { isEscapeKey, numDecline, toggleClass } from './util.js';

// Количество комментариев, загружаемых за один раз
const COMMENTS_STEP = 5;

// --- DOM Элементы (Константы) ---
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

// --- Состояние модуля ---
let commentsCount = COMMENTS_STEP;
let currentComments = [];

/**
 * Переключает видимость большой картинки (Ваша функция)
 */
const toggleModal = () => {
  toggleClass(bigPicture, 'hidden');
  toggleClass(document.body, 'modal-open');
};

/**
 * Создает один комментарий
 * ... (функция createComment остается неизменной) ...
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
 * ... (функция renderComments остается неизменной) ...
 */
const renderComments = () => {
  socialComments.replaceChildren();
  const displayedCount = Math.min(commentsCount, currentComments.length);
  socialCommentsCount.innerHTML = `${displayedCount} из <span class="comments-count">${currentComments.length}</span> ${numDecline(currentComments.length, 'комментария', 'комментария', 'комментариев')}`;

  for (let i = 0; i < displayedCount; i++) {
    commentFragment.appendChild(createComment(currentComments[i]));
  }

  // Управление видимостью кнопки через класс 'hidden'
  if (displayedCount >= currentComments.length) {
    loadButton.classList.add('hidden');
  } else {
    loadButton.classList.remove('hidden');
  }
  socialComments.appendChild(commentFragment);
};

/**
 * Меняет основные данные большой картинки (URL, лайки, описание)
 * ... (функция show остается неизменной) ...
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

/**
 * Обработчик нажатия Escape.
 * Использует функцию-обертку closeBigPictureHandler для централизованного закрытия.
 */
function onBigPictureEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    // Внедряем preventDefault()
    evt.preventDefault();
    closeBigPictureHandler(evt);
  }
}

/**
 * Обработчик закрытия модального окна по клику/Escape.
 * Содержит логику сброса состояния и удаления слушателей.
 */
function closeBigPictureHandler(evt) {
  // Внедряем preventDefault() для кнопки закрытия
  if (evt) {
    evt.preventDefault();
  }

  toggleModal();

  // Логика, выполняемая ТОЛЬКО при закрытии:
  commentsCount = COMMENTS_STEP; // Сброс счетчика при закрытии
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
}

/**
 * Обработчик открытия модального окна.
 * Устанавливает данные, отображает их и добавляет слушатели.
 * @param {Object} picture объект с одной картинкой
 */
const openBigPictureHandler = (picture) => {
  currentComments = picture.comments.slice();
  show(picture);
  renderComments();

  // Добавляем слушатель ТОЛЬКО при открытии
  document.addEventListener('keydown', onBigPictureEscKeyDown);

  toggleModal();
};

export const renderBigPicture = () => {
  // --- Настройка основных обработчиков событий ---
  loadButton.addEventListener('click', onLoadCommentsButtonClick);
  // Используем новую функцию-обработчик закрытия
  closeButton.addEventListener('click', closeBigPictureHandler);
  return openBigPictureHandler;
};

