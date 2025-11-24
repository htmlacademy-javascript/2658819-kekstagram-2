
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
const socialCommentsCount = document.querySelector('.social__comment-count');
const loadButton = document.querySelector('.comments-loader');
const socialCommentTemplate = document.querySelector('.social__comment');

const commentFragment = document.createDocumentFragment();

// --- Состояние модуля ---
let commentsCount = COMMENTS_STEP;
let currentComments = [];


// =====================================================================
// Используем function declaration для всех основных функций,
// чтобы их можно было вызывать в любом порядке (благодаря Hoisting)
// =====================================================================


/**
 * Переключает видимость большой картинки (модального окна)
 */
const toggleModal = () => {
  toggleClass(bigPicture, 'hidden');
  toggleClass(document.body, 'modal-open');
};


/**
 * Создает один комментарий на основе шаблона (стрелочная функция, используется внутри)
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
 * Отрисовывает комментарии внутри большой картинки.
 * Управляет видимостью кнопки загрузки и ее слушателем.
 */
function renderComments() {
  socialComments.replaceChildren();

  const displayedCount = Math.min(commentsCount, currentComments.length);
  socialCommentsCount.innerHTML = `${displayedCount} из <span class="comments-count">${currentComments.length}</span> ${numDecline(currentComments.length, 'комментария', 'комментария', 'комментариев')}`;

  for (let i = 0; i < displayedCount; i++) {
    commentFragment.appendChild(createComment(currentComments[i]));
  }

  // --- ЛОГИКА СКРЫТИЯ КНОПКИ И УДАЛЕНИЯ СЛУШАТЕЛЯ ---
  if (displayedCount >= currentComments.length) {
    // Если все комментарии показаны:
    loadButton.classList.add('hidden');
    // !!! УДАЛЯЕМ ОБРАБОТЧИК КЛИКА С КНОПКИ !!!
    loadButton.removeEventListener('click', onLoadCommentsButtonClick);
  } else {
    // Если есть еще комментарии, убеждаемся, что кнопка видна и слушатель есть
    loadButton.classList.remove('hidden');
    // addEventListener безопасен: если слушатель уже прикреплен, он не будет добавлен повторно.
    loadButton.addEventListener('click', onLoadCommentsButtonClick);
  }
  // --- КОНЕЦ ЛОГИКИ ---

  socialComments.appendChild(commentFragment);
}


/**
 * Меняет основные данные большой картинки (URL, лайки, описание)
 * @param {Object} picture объект с одной картинкой
 */
function show(picture) {
  const {url, likes, description} = picture;
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;
}


/**
 * Функция закрытия модального окна.
 * Удаляет ВСЕ слушатели событий, связанные с большим фото.
 */
function closeBigPicture() {
  commentsCount = COMMENTS_STEP; // Сброс счетчика при закрытии

  // !!! Удаляем ВСЕХ слушателей при закрытии !!!
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
  closeButton.removeEventListener ('click', onCloseBigPictureClick);
  // Слушатель loadButton управляется внутри renderComments при выполнении условия

  toggleModal();
}


/**
 * Обработчик клика по кнопке "Загрузить еще комментарии"
 */
function onLoadCommentsButtonClick() {
  commentsCount += COMMENTS_STEP;
  renderComments();
}


/**
 * Обработчик нажатия Escape.
 */
function onBigPictureEscKeyDown(evt) {
  if(isEscapeKey(evt)){
    closeBigPicture();
  }
}


/**
 * Обработчик клика по кнопке закрытия.
 */
function onCloseBigPictureClick() {
  closeBigPicture();
}


/**
 * Открывает большую картинку.
 * Добавляет слушатели событий при открытии.
 * Эта функция экспортируется и вызывается модулем initialize-gallery.js
 * @param {Object} picture объект с одной картинкой
 */
function renderBigPicture(picture) {
  currentComments = picture.comments.slice();

  show(picture);
  renderComments(); // renderComments содержит логику управления слушателем loadButton

  // Добавляем слушатели при открытии
  document.addEventListener('keydown', onBigPictureEscKeyDown);
  closeButton.addEventListener ('click', onCloseBigPictureClick);
  // loadButton.addEventListener управляется внутри renderComments

  toggleModal();
}

// !!! Важно: в конце модуля нет висячих addEventListener, все управляется динамически !!!

export { renderBigPicture };

