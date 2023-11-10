import { deactivateForm, address } from './form.js';
import { loadMap, getMarkerCoords, marker } from './map.js';

deactivateForm();

loadMap();
getMarkerCoords(address, marker);
