import { showErrorMessage } from './util.js';
import { resetForm } from './form.js';

// Promise
// const getData = (onSuccess) => {
//   fetch(
//     'https://25.javascript.pages.academy/keksobooking/data',
//     {
//       method: 'GET',
//       credentials: 'same-origin',
//     },
//   )
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       showErrorMessage('Ошибка получения данных!');
//     })
//     .then((offers) => {
//       onSuccess(offers);
//     })
//     .catch((error) => {
//       showErrorMessage(error.message);
//     });
// };

// Async Await
const getData = async ( onSuccess ) => {
  try {
    const response = await fetch(
      'https://25.javascript.pages.academy/keksobooking/data'
    );

    if (!response.ok) {
      showErrorMessage('Ошибка получения данных!');
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    showErrorMessage(error.message);
  }


// Promise
  // fetch(
  //   'https://25.javascript.pages.academy/keksobooking/data',
  //   {
  //     method: 'GET',
  //     credentials: 'same-origin',
  //   },
  // )
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     }
  //     showErrorMessage('Ошибка получения данных!');
  //   })
  //   .then((offers) => {
  //     onSuccess(offers);
  //   })
  //   .catch((error) => {
  //     onFail(error.message);
  //   });
};

// Async Await
const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://25.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body,
      },
    );

    if (!response.ok) {
      return onFail();
    }

    onSuccess();
    resetForm(); // Сброс формы в случае успешной отправки

  } catch (error) {
    onFail();
  }

};

export { getData, sendData };
