const container = document.querySelector('#map-canvas');
const advTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderAdvertisement = (ads) => {

  ads.forEach(({author, offer}) => {
    const advElement = advTemplate.cloneNode(true);

    const advAvatar = advElement.querySelector('.popup__avatar');
    if (author.avatar !== 'img/avatars/userundefined.png') {
      advAvatar.src = author.avatar;
    } else {
      advAvatar.hidden = true;
    }

    const advTitle = advElement.querySelector('.popup__title');
    if (offer.title !== '') {
      advTitle.textContent = offer.title;
    } else {
      advTitle.hidden = true;
    }

    const advAddress = advElement.querySelector('.popup__text--address');
    if (offer.address !== '') {
      advAddress.textContent = offer.address;
    } else {
      advAddress.hidden = true;
    }

    const advPrice = advElement.querySelector('.popup__text--price');
    if (offer.price !== '') {
      advPrice.textContent = `${offer.price} ₽/ночь`;
    } else {
      advPrice.hidden = true;
    }

    const advCapacity = advElement.querySelector('.popup__text--capacity');
    if (offer.rooms !== '' || offer.guests !== '') {
      advCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    } else {
      advCapacity.hidden = true;
    }

    const advTime = advElement.querySelector('.popup__text--time');
    if (offer.checkin !== '' || offer.checkout !== '') {
      advTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    } else {
      advTime.hidden = true;
    }

    const advDescription = advElement.querySelector('.popup__description');
    if (offer.checkin !== '' || offer.checkout !== '') {
      advDescription.textContent = offer.description;
    } else {
      advDescription.hidden = true;
    }


    const TYPES = {flat: 'Квартира', bungalow: 'Бунгало', house: 'Дом', palace: 'Дворец', hotel: 'Отель'};

    for (const key in TYPES) {
      if (key === offer.type) {
        advElement.querySelector('.popup__type').textContent = TYPES[key];
      }
    }

    const featuresContainer = advElement.querySelector('.popup__features');
    if(offer.features.length === 0) {
      featuresContainer.hidden = true;
    }
    const featuresList = featuresContainer.querySelectorAll('.popup__feature');
    const modifiers = offer.features.map((features) => `popup__feature--${features}`);


    featuresList.forEach((itemFeatures) => {
      const modifier = itemFeatures.classList[1];

      if(!modifiers.includes(modifier)) {
        itemFeatures.remove();
      }
    });

    const photosContainer = advElement.querySelector('.popup__photos');
    if(offer.photos.length === 0) {
      photosContainer.hidden = true;
    }
    const photosItem = photosContainer.querySelector('.popup__photo');
    photosItem.remove();

    offer.photos.forEach((itemSrc) => {
      const photo = photosItem.cloneNode(true);
      photo.src = itemSrc;

      photosContainer.append(photo);
    });

    container.append(advElement);
  });
};


export {renderAdvertisement};
