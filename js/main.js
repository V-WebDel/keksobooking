import { deactivateForm } from './form.js';
import { setFilter } from './form-filter.js';
import { loadMap, renderOffers } from './map.js';
import { getData } from './api.js';
import { debounce } from './util.js';
import './avatar.js';

const RERENDER_DELAY = 500;

deactivateForm();
loadMap();

getData((offers) => {
  renderOffers(offers);

  setFilter(debounce(
    () => renderOffers(offers),
    RERENDER_DELAY,
  ));
});
