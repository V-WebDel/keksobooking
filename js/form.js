const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelectorAll('input, button, select, textarea, fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('input, button, select, textarea, fieldset');
const address = adForm.querySelector('#address');

const sliderElement = adForm.querySelector('.ad-form__slider');
const valueElement = adForm.querySelector('#price');


function deactivateForm() {
  adForm.classList.add('ad-form--disabled');
  formElements.forEach((item) => {
    item.disabled = true;
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFiltersElements.forEach((item) => {
    item.disabled = true;
  });
}

function activateForm() {
  adForm.classList.remove('ad-form--disabled');
  formElements.forEach((item) => {
    item.disabled = false;
  });

  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersElements.forEach((item) => {
    item.disabled = false;
  });
}


const messages = {
  required: 'Заполните это поле',
  email: 'Введите корректный адрес',
  number: 'Здесь необходимо число',
  integer: 'Здесь должно быть целое число',
  url: 'Необходимо ввести корректный адрес сайта',
  tel: 'Необходимо ввести корректный номер',
  maxlength: 'Не более ${1} символа',
  minlength: 'Не менее ${1} символа',
  min: 'Минимальное значение не должно быть меньше ${1}',
  max: 'Максимальное значение не должно превышать ${1}',
};


Pristine.addMessages('ru', messages);
Pristine.setLocale('ru');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

const roomsField = adForm.querySelector('#room_number');
const placesField = adForm.querySelector('#capacity');
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const timeinField = adForm.querySelector('#timein');
const timeoutField = adForm.querySelector('#timeout');

const roomsPlace = {
  '1' : ['1'],
  '2' : ['1', '2'],
  '3' : ['1', '2', '3'],
  '100' : ['0']
};

const typePrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

// validate title
function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

// validate price
function validatePrice (value) {
  return value.length <= 100000;
}

pristine.addValidator(
  adForm.querySelector('#price'),
  validatePrice,
  'Максимальное значение 100 000'
);

// validate rooms and places
function validateRoomsPlaces () {
  return roomsPlace[roomsField.value].includes(placesField.value);
}

function getRoomsPlaceErrorMessage () {
  let message = '';

  if (roomsField.value === '100' && roomsPlace[roomsField.value] !== '0') {
    message = 'Данное размещение "не для гостей"';
  } else {
    message = 'Выберите количество комнат более или равноe числу гостей';
  }

  return message;
}

pristine.addValidator(roomsField, validateRoomsPlaces, getRoomsPlaceErrorMessage);

const changeRooms = function() {
  pristine.validate(placesField);
};

const changePlaces = function() {
  pristine.validate(roomsField);
};

placesField.addEventListener('change', changePlaces);
roomsField.addEventListener('change', changeRooms);


// validate type and price
function validateTypePrice () {
  return priceField.value >= typePrice[typeField.value];
}

function getTypePriceErrorMessage () {
  return `Цена не может быть ниже ${typePrice[typeField.value]}`;
}

pristine.addValidator(priceField, validateTypePrice, getTypePriceErrorMessage);

const changeType = function() {
  const priceMin = typePrice[typeField.value];
  priceField.placeholder = priceMin;
  priceField.min = priceMin;

  pristine.validate(priceField);
};

typeField.addEventListener('change', changeType);

priceField.addEventListener('change', () => {
  if (Number(priceField.value) === Number(priceField.value) && priceField.value <= 100000) {
    sliderElement.noUiSlider.set(priceField.value);
  }

  changeType();
});


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  animate: true,
  start: 0,
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
  changeType();
});


// change timein and timeout
function changeTime () {
  timeinField.value = this.value;
  timeoutField.value = this.value;
}

timeinField.addEventListener('change', changeTime);
timeoutField.addEventListener('change', changeTime);


// submit form
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    // console.log('Можно отправлять');
  } else {
    // console.log('Форма невалидна');
  }
});


export {deactivateForm, activateForm, address};
