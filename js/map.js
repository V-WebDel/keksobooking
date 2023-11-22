import { activateForm, address } from './form.js';
import { renderAdvertisement } from './render.js';


const MARKER_CENTER = [35.689439, 139.762659];
const TOKIO_CENTER = [35.68275, 139.75102];
const ZOOM = 13;
const ADS_COUNT = 50;

const map = L.map('map-canvas');

const loadMap = () => {
  map.on('load', () => {
    activateForm();
  })
    .setView({
      lat: TOKIO_CENTER[0],
      lng: TOKIO_CENTER[1],
    }, ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: MARKER_CENTER[0],
    lng: MARKER_CENTER[1],
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const iconAds = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

marker.addTo(map);

marker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(6)}, ${evt.target.getLatLng().lng.toFixed(6)}`;
});


const resetMap = () => {
  map.setView({
    lat: TOKIO_CENTER[0],
    lng: TOKIO_CENTER[1],
  }, ZOOM);
  marker.setLatLng({
    lat: MARKER_CENTER[0],
    lng: MARKER_CENTER[1],
  });
};

const markerGroup = L.layerGroup().addTo(map);


const hasAllElems = (arr1, arr2) => arr1.every((elem) => arr2.includes(elem));

const getFilterOffers = (advert, filterParams, featuresParams) => {
  const popup = document.querySelector('.leaflet-popup');
  const type = advert.offer.type;
  const rooms = advert.offer.rooms;
  const price = advert.offer.price;
  const guests = advert.offer.guests;
  const featuresList = advert.offer.features;

  markerGroup.clearLayers();
  resetMap();

  if (popup) { popup.style.display = 'none'; }

  if (('housing-type' in filterParams) && (type !== filterParams['housing-type'])){
    return false;
  }

  if (('housing-rooms' in filterParams) && (rooms !== +filterParams['housing-rooms'])) {
    return false;
  }

  if ('housing-price' in filterParams) {
    switch (filterParams['housing-price']) {
      case 'middle':
        if (price < 10000 || price > 50000) { return false; }
        break;
      case 'low':
        if (price >= 10000) { return false; }
        break;
      case 'high':
        if (price < 50000) { return false; }
        break;
    }
  }
  if (('housing-guests' in filterParams) && (guests !== +filterParams['housing-guests'])) {
    return false;
  }
  if (featuresList && featuresParams !== []) {
    if (!hasAllElems(featuresParams, featuresList)) { return false; }
  }
  return true;
};


const renderOffers = (listOffers) => {
  const form = document.querySelector('.map__filters');
  const selectors = form.querySelectorAll('select');
  const features = form.querySelectorAll('input[type="checkbox"]:checked');

  const filterParams = [];
  const featuresParams = [];

  features.forEach( (feature) => {
    featuresParams.push(feature.value);
  });

  selectors.forEach((selector) => {
    if (selector.value !== 'any') {filterParams[selector.name] = selector.value;}
  });

  listOffers
    .filter((itemOffer) => getFilterOffers(itemOffer, filterParams, featuresParams))
    .slice(0, ADS_COUNT)
    .forEach(({author, offer, location}) => {
      const markerSimple = L.marker(
        {
          lat: location.lat,
          lng: location.lng,
        },
        {
          icon: iconAds
        },
      );

      markerSimple
        .addTo(markerGroup)
        .bindPopup(renderAdvertisement({author, offer}));
    });
};


export { loadMap, renderOffers, resetMap, MARKER_CENTER };
