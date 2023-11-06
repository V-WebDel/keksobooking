const container = document.querySelector('#map-canvas');
const advTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderAdvertisement = (ads) => {

  ads.forEach(({author, offer}) => {
    const advElement = advTemplate.cloneNode(true);
    const advAvatar = advElement.querySelector('.popup__avatar');
    const advTitle = advElement.querySelector('.popup__title');
    const advAddress = advElement.querySelector('.popup__text--address');
    const advPrice = advElement.querySelector('.popup__text--price');
    const advCapacity = advElement.querySelector('.popup__text--capacity');
    const advTime = advElement.querySelector('.popup__text--time');
    const advDescription = advElement.querySelector('.popup__description');

    const TYPES = {flat: 'Квартира', bungalow: 'Бунгало', house: 'Дом', palace: 'Дворец', hotel: 'Отель'};

    const featuresContainer = advElement.querySelector('.popup__features');
    const featuresList = featuresContainer.querySelectorAll('.popup__feature');
    const modifiers = offer.features.map((features) => `popup__feature--${features}`);
    const photosContainer = advElement.querySelector('.popup__photos');
    const photosItem = photosContainer.querySelector('.popup__photo');


    if (author.avatar !== 'img/avatars/userundefined.png') {
      advAvatar.src = author.avatar;
    } else {
      advAvatar.src = 'img/avatars/user.svg';
    }

    if (offer.title !== '') {
      advTitle.textContent = offer.title;
    } else {
      advTitle.hidden = true;
    }

    if (offer.address !== '') {
      advAddress.textContent = offer.address;
    } else {
      advAddress.hidden = true;
    }

    if (offer.price !== '') {
      advPrice.textContent = `${offer.price} ₽/ночь`;
    } else {
      advPrice.hidden = true;
    }

    if (offer.rooms !== '' || offer.guests !== '') {
      advCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    } else {
      advCapacity.hidden = true;
    }

    if (offer.checkin !== '' || offer.checkout !== '') {
      advTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    } else {
      advTime.hidden = true;
    }

    if (offer.description !== '') {
      advDescription.textContent = offer.description;
    } else {
      advDescription.hidden = true;
    }

    for (const key in TYPES) {
      if (key === offer.type) {
        advElement.querySelector('.popup__type').textContent = TYPES[key];
      }
    }

    if(offer.features.length === 0) {
      featuresContainer.hidden = true;
    }

    featuresList.forEach((itemFeatures) => {
      const modifier = itemFeatures.classList[1];

      if(!modifiers.includes(modifier)) {
        itemFeatures.remove();
      }
    });

    if(offer.photos.length === 0) {
      photosContainer.hidden = true;
    }

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
