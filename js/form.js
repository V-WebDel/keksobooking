function stateForm() {
  const adForm = document.querySelector('.ad-form');
  const formElements = adForm.querySelectorAll('input, button, select, textarea, fieldset');
  const mapFilters = document.querySelector('.map__filters');
  const mapFiltersElements = mapFilters.querySelectorAll('input, button, select, textarea, fieldset');

  adForm.classList.add('ad-form--disabled');
  formElements.forEach((item) => {
    item.disabled = true;
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFiltersElements.forEach((item) => {
    item.disabled = true;
  });
}

export {stateForm};
