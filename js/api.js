
// --- Константы API  ---
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/';
const ENDPOINTS = {
  GET_DATA: `${BASE_URL}data`,
  SEND_DATA: `${BASE_URL}`
};

const DATA_ERROR_SHOW_TIME = 5000;
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

/**
 * Показывает сообщение об ошибке загрузки данных на короткое время.
 */
const showDataError = () => {
  const errorElement = dataErrorTemplate.cloneNode(true);
  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, DATA_ERROR_SHOW_TIME);
};

/**
 * Загружает данные с сервера.
 * Возвращает Промис.
 */
const loadData = () =>
  fetch(ENDPOINTS.GET_DATA)
    .then((response) =>
      !response.ok
        ? Promise.reject(new Error(`Ошибка загрузки данных: ${response.status} ${response.statusText}`))
        : response.json()
    )
    .catch((error) => {
      showDataError();
      throw error;
    });


/**
 * Отправляет данные формы на сервер.
 * Возвращает Промис.
 */
const sendData = (formData) =>
  fetch(ENDPOINTS.SEND_DATA, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка отправки данных: ${response.status} ${response.statusText}`);
      }
      return response;
    })
    .catch((error) => {
      throw error;
    });

export { loadData, sendData };
