'use strict';

const ROOMS_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const NUMBERS_AVATAR = [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`];
const PIN_WIDTH = 40 / 2;
const PIN_HEIGHT = 40;
const MAX_OFFERS = 8;
const MAP_MAIN_PIN_WIDTH = 62 / 2;
const MAP_MAIN_PIN_HEIGHT = 84;
const mapElement = document.querySelector(`.map`);
const mapFiltersElement = document.querySelector(`.map__filters`);
const mapPinMainElement = document.querySelector(`.map__pin--main`);
const pinTemplateElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplateElement = document.querySelector(`#card`).content.querySelector(`.popup`);
const mapPinsElement = document.querySelector(`.map__pins`);
const filtersContainerElement = mapElement.querySelector(`.map__filters-container`);
const formAddressElement = document.querySelector(`#address`);
const formTypeElement = document.querySelector(`#type`);
const formPriceElement = document.querySelector(`#price`);
const adFormElement = document.querySelector(`.ad-form`);
const formAvatarElement = document.querySelector(`#avatar`);
const formTitleElement = document.querySelector(`#title`);
const formTimeinElement = document.querySelector(`#timein`);
const formTimeoutElement = document.querySelector(`#timeout`);
const formRoomCapacityElement = document.querySelector(`#capacity`);
const formRoomNumberElement = document.querySelector(`#room_number`);
const formDescriptionElement = document.querySelector(`#description`);
const formImagesElement = document.querySelector(`#images`);
const formSubmitButtonElement = document.querySelector(`.ad-form__submit`);
const mapFeaturesElement = document.querySelector(`.map__features`);
const formAllFieldsetsElements = adFormElement.querySelectorAll(`.ad-form__element`);
const formHeaderFieldsetElement = adFormElement.querySelector(`.ad-form-header`);
const mapFiltersAllElements = mapFiltersElement.querySelectorAll(`.map__filter`);
const formAddressX = parseInt(mapPinMainElement.style.left, 10) + MAP_MAIN_PIN_WIDTH;
const formAddressY = parseInt(mapPinMainElement.style.top, 10) + MAP_MAIN_PIN_HEIGHT;
const elementsDisableEnable = [];
const pins = [];

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomNumberFromRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomItemsFromArray(arr) {
  const myArr = arr.slice(0);
  const randomLength = getRandomNumber(myArr.length + 1);

  for (let i = 0; i < randomLength; i++) {
    myArr.splice(getRandomNumber(myArr.length), 1);
  }

  return myArr;
}

function createOffer() {
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
}

function renderPin(ad) {
  const element = pinTemplateElement.cloneNode(true);
  const img = element.querySelector(`img`);

  element.style.left = ad.location.x + PIN_WIDTH + `px`;
  element.style.top = ad.location.y + PIN_HEIGHT + `px`;
  img.src = ad.author.avatar;
  img.alt = ad.offer.title;

  return element;
}

function renderCard(ad) {
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
}

function renderPins(arr) {
  const fragment = document.createDocumentFragment();

  arr.forEach(function (element) {
    fragment.appendChild(renderPin(element));
  });

  return fragment;
}

function renderCards(arr) {
  const fragment = document.createDocumentFragment();

  arr.forEach(function (element) {
    fragment.appendChild(renderCard(element));
  });

  return fragment;
}

function disableEverything(disable) {
  disable.setAttribute(`disabled`, `disabled`);
}

function enableEverything(enable) {
  enable.removeAttribute(`disabled`, `disabled`);
}

function changeTwoElementValue(change, changer) {
  change.value = changer.value;
}

function onRoomNumberChange() {
  if (formRoomCapacityElement.value === '0' && formRoomNumberElement.value !== '100') {
    formRoomNumberElement.setCustomValidity('Только 100 комнат!');
  } else if (formRoomNumberElement.value === '100' && formRoomCapacityElement.value !== '0') {
    formRoomCapacityElement.setCustomValidity('Не для гостей');
  } else if (formRoomNumberElement.value < formRoomCapacityElement.value) {
    formRoomCapacityElement.setCustomValidity('Понижай или проиграешь.');
    formRoomNumberElement.setCustomValidity('');
  } else {
    formRoomCapacityElement.setCustomValidity('');
    formRoomNumberElement.setCustomValidity('');
  }
}

function onFormTypeChange() {
  switch (formTypeElement.value) {
    case `bungalow`:
      formPriceElement.setAttribute(`placeholder`, 0);
      formPriceElement.setAttribute(`min`, 0);
      break;
    case `flat`:
      formPriceElement.setAttribute(`placeholder`, 1000);
      formPriceElement.setAttribute(`min`, 1000);
      break;
    case `house`:
      formPriceElement.setAttribute(`placeholder`, 5000);
      formPriceElement.setAttribute(`min`, 5000);
      break;
    case `palace`:
      formPriceElement.setAttribute(`placeholder`, 10000);
      formPriceElement.setAttribute(`min`, 10000);
      break;
  }
}

function onRoomCapacityChange() {
  if (formRoomCapacityElement.value === '0' && formRoomNumberElement.value !== '100') {
    formRoomNumberElement.setCustomValidity('Только 100 комнат!');
  } else if (formRoomNumberElement.value === '100' && formRoomCapacityElement.value !== '0') {
    formRoomCapacityElement.setCustomValidity('Не для гостей');
  } else if (formRoomNumberElement.value < formRoomCapacityElement.value) {
    formRoomCapacityElement.setCustomValidity('Понижай или проиграешь.');
    formRoomNumberElement.setCustomValidity('');
  } else {
    formRoomCapacityElement.setCustomValidity('');
    formRoomNumberElement.setCustomValidity('');
  }
}

function onTimeinChange() {
  changeTwoElementValue(formTimeoutElement, formTimeinElement);
}

function onTimeoutChange() {
  changeTwoElementValue(formTimeinElement, formTimeoutElement);
}

for (let i = 0; i < MAX_OFFERS; i++) {
  pins.push(createOffer());
}

const pinsFragment = renderPins(pins);
const cardsFragment = renderCards(pins);

// mapPinsElement.appendChild(pinsFragment);
// mapElement.insertBefore(cardsFragment, filtersContainerElement);

elementsDisableEnable.push(mapFeaturesElement, formHeaderFieldsetElement);

mapFiltersAllElements.forEach(function (element) {
  elementsDisableEnable.push(element);
});

formAllFieldsetsElements.forEach(function (element) {
  elementsDisableEnable.push(element);
});

elementsDisableEnable.forEach(function (element) {
  disableEverything(element);
});

mapPinMainElement.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    mapElement.classList.remove(`map--faded`);
    adFormElement.classList.remove(`ad-form--disabled`);
    elementsDisableEnable.forEach(function (element) {
      enableEverything(element);
    });
    formAddressElement.setAttribute(`placeholder`, formAddressX + `, ` + formAddressY);
    formTimeinElement.addEventListener(`change`, onTimeinChange);
    formTimeoutElement.addEventListener(`change`, onTimeoutChange);
    formTypeElement.addEventListener(`change`, onFormTypeChange);
    formRoomNumberElement.addEventListener(`change`, onRoomNumberChange);
    formRoomCapacityElement.addEventListener(`change`, onRoomCapacityChange);
  }
});

mapPinMainElement.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    mapElement.classList.remove(`map--faded`);
    adFormElement.classList.remove(`ad-form--disabled`);
    elementsDisableEnable.forEach(function (element) {
      enableEverything(element);
    });
    formAddressElement.setAttribute(`placeholder`, formAddressX + `, ` + formAddressY);
    formTimeinElement.addEventListener(`change`, onTimeinChange);
    formTimeoutElement.addEventListener(`change`, onTimeoutChange);
    formTypeElement.addEventListener(`change`, onFormTypeChange);
    formRoomNumberElement.addEventListener(`change`, onRoomNumberChange);
    formRoomCapacityElement.addEventListener(`change`, onRoomCapacityChange);
  }
});
