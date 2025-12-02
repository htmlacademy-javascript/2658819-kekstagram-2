
import { renderPhotos } from './render-photos.js';
import { debounce, getUniqueRandomElements } from './util.js';

const FILTER_TIMEOUT = 500; // Таймаут 0.5 секунды для устранения дребезга
const RANDOM_PHOTOS_COUNT = 10;

const filtersContainer = document.querySelector('.img-filters');

/**
 * Удаляет все текущие фотографии из галереи перед отрисовкой новых.
 */
const clearPhotos = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

/**
 * Фильтрует фотографии по умолчанию (без изменений).
 */
const filterByDefault = (photos) => photos.slice();

/**
 * Фильтрует фотографии случайно (10 шт, без повторов), используя утилиту.
 */
const filterByRandom = (photos) => getUniqueRandomElements(photos, RANDOM_PHOTOS_COUNT);

/**
 * Фильтрует фотографии по обсуждаемости (убывание комментариев).
 */
const filterByDiscussed = (photos) => photos
  .slice()
  .sort((a, b) => b.comments.length - a.comments.length);

/**
 * Применяет выбранный фильтр и перерисовывает галерею.
 */
const applyFilter = (filterFunction, photosData) => {
  clearPhotos();
  const filteredPhotos = filterFunction(photosData);
  renderPhotos(filteredPhotos);
};

/**
* Отложенная версия функции applyFilter, которая гарантирует, что отрисовка фильтров
* будет происходить не чаще, чем один раз в FILTER_TIMEOUT миллисекунд (500 мс).
* Используется для оптимизации производительности при быстром переключении фильтров.
*/
const debouncedApplyFilter = debounce(applyFilter, FILTER_TIMEOUT);

/**
 * Инициализирует обработчики фильтров.
 * @param {Array<Object>} photosData Исходный массив фотографий
 */
const initializeFilters = (photosData) => {
  filtersContainer.addEventListener('click', (evt) => {
    const targetId = evt.target.id;
    let filterFunction;
    filtersContainer.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    evt.stopPropagation();
    switch (targetId) {
      case 'filter-random':
        filterFunction = filterByRandom;
        break;
      case 'filter-discussed':
        filterFunction = filterByDiscussed;
        break;
      case 'filter-default':
      default:
        filterFunction = filterByDefault;
        break;
    }
    debouncedApplyFilter(filterFunction, photosData);
  });
};

export { initializeFilters };
