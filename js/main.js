import { deactivateForm } from './form.js';
import { loadMap, renderPoints } from './map.js';
import { getData } from './api.js';
import './avatar.js';

const ADS_COUNT = 15;

deactivateForm();
loadMap();

getData((offers) => {
  renderPoints(offers.slice(0, ADS_COUNT));
});
