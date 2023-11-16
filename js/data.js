import {getRandomNumber, getRandomElements} from './util.js';


const TITLE = ['Просторная квартира с видом на парк', 'Стильный лофт в историческом центре', 'Уютный дом с садом и бассейном', 'Современная студия в центре города', 'Двухэтажный коттедж для семейного отдыха'];
const DESCRIPTION = ['Идеальное место для тех, кто ценит комфорт и природу. Квартира полностью меблирована, чтобы сделать ваше пребывание незабываемым.', 'Очарование старого города со всеми современными удобствами. Этот лофт предлагает уникальный опыт проживания с пешеходным доступом ко всем достопримечательностям.', 'Идеальное место для семейного отдыха. Дом оборудован всем необходимым, и у вас есть возможность расслабиться у бассейна и наслаждаться зеленью сада.', 'Идеальный вариант для одиночных путешественников или пар. Светлая и уютная студия, предоставляющая все удобства для комфортного проживания.', 'Просторное жилье с большой гостиной и кухней. Здесь есть место для всей семьи, чтобы провести отличное время вдали от городской суеты.'];
const AVATAR = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


const createAuthor = () => {
  const randomAvatar = AVATAR[getRandomNumber(0, AVATAR.length - 1, 0)];

  return {
    avatar: `img/avatars/user${randomAvatar}.png`,
  };
};

const createOffer = () => {
  const randomTitleDescription = getRandomNumber(0, TITLE.length - 1, 0);
  const randomTitle = TITLE[randomTitleDescription];
  const randomDescription = DESCRIPTION[randomTitleDescription];
  const randomLat = getRandomNumber(35.65000, 35.70000, 5);
  const randomLng = getRandomNumber(139.70000, 139.80000, 5);
  const randomCheckin = CHECKIN[getRandomNumber(0, CHECKIN.length - 1, 0)];

  const randomType = TYPE[getRandomNumber(0, TYPE.length - 1, 0)];
  const randomFeatures = getRandomElements(FEATURES);
  const randomPhotos = getRandomElements(PHOTOS);

  return {
    title: randomTitle,
    description: randomDescription,
    address: [randomLat, randomLng],
    price: getRandomNumber(100, 2000, 0),
    type: randomType,
    rooms: getRandomNumber(1, 10, 0),
    guests: getRandomNumber(1, 20, 0),
    checkin: randomCheckin,
    checkout: randomCheckin,
    features: randomFeatures,
    photos: randomPhotos,
  };
};

const createObject = () => {
  const AUTHOR = createAuthor();
  const OFFER = createOffer();

  return {
    author: AUTHOR,
    offer: OFFER,
  };
};


// const similarOffer = () => Array.from({length: 10}, createObject);
const similarOffer = Array.from({length: 10}, createObject);

export {similarOffer};
