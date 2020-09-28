'use strict';

const mapElement = document.querySelector(`.map`);
const pinTemplateElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPinsElement = document.querySelector(`.map__pins`);
const ROOMS_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const NUMBERS_AVATAR = [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`];
const PIN_WIDTH = 40 / 2;
const PIN_HEIGHT = 40;
const MAX_OFFERS = 8;
const pins = [];

const getRandomNumber = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomNumberFromRange = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomItemsFromArray = function (arr) {
  const myArr = arr.slice(0);
  const randomLength = getRandomNumber(myArr.length + 1);

  for (let i = 0; i < randomLength; i++) {
    myArr.splice(getRandomNumber(myArr.length), 1);
  }

  return myArr;
};

const createOffer = function () {
  const location = {
    x: getRandomNumberFromRange(30, 1170),
    y: getRandomNumberFromRange(160, 600),
  };

  return {
    author: {
      avatar: `img/avatars/user` + NUMBERS_AVATAR[getRandomNumber(NUMBERS_AVATAR.length)] + `.png`,
    },
    offer: {
      title: `Заголовок!`,
      address: location.x + `, ` + location.y,
      price: 5000,
      type: ROOMS_TYPE[getRandomNumber(ROOMS_TYPE.length)],
      rooms: 3,
      guests: 3,
      checkin: `12:00`,
      checkout: `13:00`,
      features: getRandomItemsFromArray(FEATURES),
      description: `Не очень длинное описание.`,
      photos: getRandomItemsFromArray(PHOTOS),
    },
    location,
  };
};

const renderPins = function (arr) {
  const fragment = document.createDocumentFragment();

  arr.forEach((element) => fragment.appendChild(renderPin(element)));

  return fragment;
};

const renderPin = function (offer) {
  const element = pinTemplateElement.cloneNode(true);
  const img = element.querySelector(`img`);

  element.style.left = offer.location.x + PIN_WIDTH + `px`;
  element.style.top = offer.location.y + PIN_HEIGHT + `px`;
  img.src = offer.author.avatar;
  img.alt = offer.offer.title;

  return element;
};

mapElement.classList.remove(`map--faded`);

for (let i = 0; i < MAX_OFFERS; i++) {
  pins.push(createOffer());
}

const pinsFragment = renderPins(pins);

mapPinsElement.appendChild(pinsFragment);

console.log(1);

const cardTemplateElement = document.querySelector(`#card`).content.querySelector(`.popup`);

const renderCard = function (offer) {
  const element = cardTemplateElement.cloneNode(true);
  const titleElement = element.querySelector(`.popup__title`);
  const addressElement = element.querySelector(`.popup__text--address`);
  const priceElement = element.querySelector(`.popup__text--price`);
  const typeElement = element.querySelector(`.popup__type`);
  const capacityElement = element.querySelector(`.popup__text--capacity`);
  const timeElement = element.querySelector(`.popup__text--time`);
  const featuresElement = element.querySelector(`.popup__features`);
  const descriptionElement = element.querySelector(`.popup__description`);

  const avatarElement = element.querySelector(`.popup__avatar`);

  const photosElement = element.querySelector(`.popup__photos`);
  const photoElement = photosElement.querySelector(`.popup__photo`);

  if (offer.offer.photos.length !== 0) {
    for (let i = 0; i < offer.offer.photos.length - 1; i++) {
      photosElement.appendChild(photoElement.cloneNode(true));
    }

    const photoElements = photosElement.querySelectorAll(`.popup__photo`);

    for (let i = 0; i < offer.offer.photos.length; i++) {
      photoElements[i].src = offer.offer.photos[i];
    }
  } else {
    photoElement.classList.add(`hidden`);
  }

  if (offer.offer.title !== undefined) {
    titleElement.textContent = offer.offer.title;
  } else {
    titleElement.classList.add(`hidden`);
  }

  if (offer.offer.address !== undefined) {
    addressElement.textContent = offer.offer.address;
  }

  if (offer.offer.price !== undefined) {
    priceElement.textContent = offer.offer.price + `₽/ночь`;
  }

  if (offer.offer.rooms && offer.offer.guests !== undefined) {
    capacityElement.textContent = offer.offer.rooms + ` комнаты для ` + offer.offer.guests + ` гостей`;
  }

  if (offer.offer.checkin && offer.offer.checkout !== undefined) {
    timeElement.textContent = `Заезд после ` + offer.offer.checkin + `, выезд до ` + offer.offer.checkout;
  }

  if (offer.offer.features.length !== 0) {
    featuresElement.textContent = offer.offer.features;
  }

  if (offer.offer.description !== undefined) {
    descriptionElement.textContent = offer.offer.description;
  }

  if (offer.author.avatar !== undefined) {
    avatarElement.src = offer.author.avatar;
  }

  return element;
};

console.log(pins[0]);

mapPinsElement.appendChild(renderCard(pins[0]));
