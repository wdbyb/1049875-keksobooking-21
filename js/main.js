'use strict';

const mapElement = document.querySelector(`.map`);
const pinTemplateElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplateElement = document.querySelector(`#card`).content.querySelector(`.popup`);
const mapPinsElement = document.querySelector(`.map__pins`);
const filtersContainerElement = mapElement.querySelector(`.map__filters-container`);
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

const renderPin = function (ad) {
  const element = pinTemplateElement.cloneNode(true);
  const img = element.querySelector(`img`);

  element.style.left = ad.location.x + PIN_WIDTH + `px`;
  element.style.top = ad.location.y + PIN_HEIGHT + `px`;
  img.src = ad.author.avatar;
  img.alt = ad.offer.title;

  return element;
};

const renderCard = function (ad) {
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
  const photoTemplateElement = photosElement.querySelector(`.popup__photo`);
  const offerTypes = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`,
  };

  addressElement.textContent = ad.offer.address;
  priceElement.textContent = ad.offer.price + `₽/ночь`;
  titleElement.textContent = ad.offer.title;
  capacityElement.textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
  timeElement.textContent = `Заезд после ` + ad.offer.checkin + `, выезд до ` + ad.offer.checkout;
  descriptionElement.textContent = ad.offer.description;
  avatarElement.src = ad.author.avatar;
  typeElement.textContent = offerTypes[ad.offer.type];

  ad.offer.photos.forEach((photo) => {
    const photoElement = photoTemplateElement.cloneNode(true);
    photoElement.src = photo;
    photosElement.appendChild(photoElement);
  });

  photoTemplateElement.remove();

  ad.offer.features.forEach(function (feature) {
    featuresElement.querySelector(`.popup__feature--` + feature).classList.remove(`hidden`);
  });

  return element;
};

const renderPins = function (arr) {
  const fragment = document.createDocumentFragment();

  arr.forEach(function (element) {
    fragment.appendChild(renderPin(element));
  });

  return fragment;
};

const renderCards = function (arr) {
  const fragment = document.createDocumentFragment();

  arr.forEach(function (element) {
    fragment.appendChild(renderCard(element));
  });

  return fragment;
};

for (let i = 0; i < MAX_OFFERS; i++) {
  pins.push(createOffer());
}

const pinsFragment = renderPins(pins);
const cardsFragment = renderCards(pins);

mapPinsElement.appendChild(pinsFragment);

const mapPinMainElement = document.querySelector(`.map__pin--main`);

mapPinMainElement.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    mapElement.classList.remove(`map--faded`);
  }
  inputAddressElement.setAttribute(`placeholder`, `300, 200`);
});

mapPinMainElement.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    mapElement.classList.remove(`map--faded`);
  }

});



const inputAddressElement = document.querySelector(`#address`);
const inputTypeElement = document.querySelector(`#type`);
const inputPriceElement = document.querySelector(`#price`);
const adFormElement = document.querySelector(`.ad-form`);

adFormElement.classList.remove(`ad-form--disabled`);

inputTypeElement.addEventListener(`change`, function () {
  console.log(inputTypeElement.value);
  if (inputTypeElement.value === 'bungalow') {
    inputPriceElement.setAttribute(`placeholder`, 0);
    inputPriceElement.setAttribute(`min`, 0);
  }
});



// mapElement.insertBefore(cardsFragment, filtersContainerElement);
