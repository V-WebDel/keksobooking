import { activateForm, address } from './form.js';
import { renderAdvertisement } from './render.js';


const MARKER_CENTER = [35.689439, 139.762659];
const TOKIO_CENTER = [35.68275, 139.75102];
const ZOOM = 13;

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

const renderPoints = (listOffers) => {

  listOffers.forEach(({author, offer, location}) => {
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


export { loadMap, renderPoints, resetMap, MARKER_CENTER };
