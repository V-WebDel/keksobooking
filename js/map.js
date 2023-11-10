import {activateForm} from './form.js';
import {similarOffer} from './data.js';
import {renderAdvertisement} from './render.js';


const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.71975,
    lng: 139.80102,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

function loadMap() {
  const map = L.map('map-canvas')
    .on('load', () => {
      activateForm();
    })
    .setView({
      lat: 35.71975,
      lng: 139.80102,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  marker.addTo(map);

  const renderPoints = (ads) => {
    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    ads.forEach(({author, offer}) => {
      const lat = offer.address[0];
      const lng = offer.address[1];
      const markers = L.marker({
        lat,
        lng,
      },
      {
        icon,
      });

      markers.addTo(map).bindPopup(renderAdvertisement(author, offer));
    });
  };

  renderPoints(similarOffer);
}


// marker.on('moveend', (evt) => {
//   console.log(evt.target.getLatLng());
// });
// };

function getMarkerCoords(input, mark) {
  let coords = mark.getLatLng();

  input.value = `${coords.lat}, ${coords.lng}`;
  mark.on('moveend', (evt) => {
    coords = evt.target.getLatLng();
    input.value = `${coords.lat}, ${coords.lng}`;
  });
}


export { loadMap, getMarkerCoords, marker};
