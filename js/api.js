import { showErrorMessage } from './util.js';

const getData = (onSuccess) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showErrorMessage('Ошибка получения данных!');
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch((error) => {
      showErrorMessage(error.message);
    });
};

export {getData};
