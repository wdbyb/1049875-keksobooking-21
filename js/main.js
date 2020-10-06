'use strict';

const ROOMS_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const NUMBERS_AVATAR = [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`];
const PIN_HALF_WIDTH = 20;
const PIN_HEIGHT = 40;
const MAX_OFFERS = 8;
const MAIN_PIN_HALF_WIDTH = 31;
const MAIN_PIN_HEIGHT = 84;
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
const formTimeinElement = document.querySelector(`#timein`);
const formTimeoutElement = document.querySelector(`#timeout`);
const formRoomCapacityElement = document.querySelector(`#capacity`);
const formRoomNumberElement = document.querySelector(`#room_number`);
const mapFeaturesElement = document.querySelector(`.map__features`);
const formAllFieldsetsElements = adFormElement.querySelectorAll(`.ad-form__element`);
const formHeaderFieldsetElement = adFormElement.querySelector(`.ad-form-header`);
const mapFiltersAllElements = mapFiltersElement.querySelectorAll(`.map__filter`);
const formAddressX = parseInt(mapPinMainElement.style.left, 10) + MAIN_PIN_HALF_WIDTH;
const formAddressY = parseInt(mapPinMainElement.style.top, 10) + MAIN_PIN_HEIGHT;
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

  element.style.left = ad.location.x + PIN_HALF_WIDTH + `px`;
  element.style.top = ad.location.y + PIN_HEIGHT + `px`;
  img.src = ad.author.avatar;
  img.alt = ad.offer.title;

  element.addEventListener(`click`, function () {
    const cardOnMapElement = mapElement.querySelector(`.map__card`);

    if (cardOnMapElement !== null) {
      cardOnMapElement.remove();
    }

    mapElement.insertBefore(renderCard(ad), filtersContainerElement);
  });

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
  const popupCloseElement = element.querySelector(`.popup__close`);
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

  popupCloseElement.setAttribute(`tabindex`, 0);

  popupCloseElement.addEventListener(`click`, function () {
    element.classList.add(`hidden`);
  });

  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      element.classList.add(`hidden`);
    }
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

function toggleDisabled(element, state) {
  element.toggleAttribute(`disabled`, state);
}

function onRoomNumberChange() {
  if (+formRoomCapacityElement.value === VALUE_OF_NOT_FOR_GUESTS && +formRoomNumberElement.value !== VALUE_OF_HUNDRED_ROOMS) {
    formRoomNumberElement.setCustomValidity(`Только 100 комнат!`);
  } else if (+formRoomNumberElement.value === VALUE_OF_HUNDRED_ROOMS && +formRoomCapacityElement.value !== VALUE_OF_NOT_FOR_GUESTS) {
    formRoomCapacityElement.setCustomValidity(`Не для гостей`);
  } else if (formRoomNumberElement.value < formRoomCapacityElement.value) {
    formRoomCapacityElement.setCustomValidity(`Понижай или проиграешь.`);
    formRoomNumberElement.setCustomValidity(``);
  } else {
    formRoomCapacityElement.setCustomValidity(``);
    formRoomNumberElement.setCustomValidity(``);
  }
}

const MIN_PRICE_BUNGALOW = 0;
const MIN_PRICE_FLAT = 1000;
const MIN_PRICE_HOUSE = 5000;
const MIN_PRICE_PALACE = 10000;

function onFormTypeChange() {
  switch (formTypeElement.value) {
    case `bungalow`:
      formPriceElement.setAttribute(`placeholder`, MIN_PRICE_BUNGALOW);
      formPriceElement.setAttribute(`min`, MIN_PRICE_BUNGALOW);
      break;
    case `flat`:
      formPriceElement.setAttribute(`placeholder`, MIN_PRICE_FLAT);
      formPriceElement.setAttribute(`min`, MIN_PRICE_FLAT);
      break;
    case `house`:
      formPriceElement.setAttribute(`placeholder`, MIN_PRICE_HOUSE);
      formPriceElement.setAttribute(`min`, MIN_PRICE_HOUSE);
      break;
    case `palace`:
      formPriceElement.setAttribute(`placeholder`, MIN_PRICE_PALACE);
      formPriceElement.setAttribute(`min`, MIN_PRICE_PALACE);
      break;
  }
}

const VALUE_OF_HUNDRED_ROOMS = 100;
const VALUE_OF_NOT_FOR_GUESTS = 0;

function onRoomCapacityChange() {
  if (+formRoomCapacityElement.value === VALUE_OF_NOT_FOR_GUESTS && +formRoomNumberElement.value !== VALUE_OF_HUNDRED_ROOMS) {
    formRoomNumberElement.setCustomValidity(`Только 100 комнат!`);
  } else if (+formRoomNumberElement.value === VALUE_OF_HUNDRED_ROOMS && +formRoomCapacityElement.value !== VALUE_OF_NOT_FOR_GUESTS) {
    formRoomCapacityElement.setCustomValidity(`Не для гостей`);
  } else if (formRoomNumberElement.value < formRoomCapacityElement.value) {
    formRoomCapacityElement.setCustomValidity(`Понижай или проиграешь.`);
    formRoomNumberElement.setCustomValidity(``);
  } else {
    formRoomCapacityElement.setCustomValidity(``);
    formRoomNumberElement.setCustomValidity(``);
  }
}

function onTimeinChange() {
  formTimeoutElement.value = formTimeinElement.value;
}

function onTimeoutChange() {
  formTimeinElement.value = formTimeoutElement.value;
}

for (let i = 0; i < MAX_OFFERS; i++) {
  pins.push(createOffer());
}

const pinsFragment = renderPins(pins);

elementsDisableEnable.push(mapFeaturesElement, formHeaderFieldsetElement);

mapFiltersAllElements.forEach(function (element) {
  elementsDisableEnable.push(element);
});

formAllFieldsetsElements.forEach(function (element) {
  elementsDisableEnable.push(element);
});

elementsDisableEnable.forEach(function (element) {
  toggleDisabled(element, true);
});

mapPinMainElement.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    mapElement.classList.remove(`map--faded`);
    adFormElement.classList.remove(`ad-form--disabled`);
    elementsDisableEnable.forEach(function (element) {
      toggleDisabled(element, false);
    });
    mapPinsElement.appendChild(pinsFragment);
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
      toggleDisabled(element, false);
    });
    mapPinsElement.appendChild(pinsFragment);
    formAddressElement.setAttribute(`placeholder`, formAddressX + `, ` + formAddressY);
    formTimeinElement.addEventListener(`change`, onTimeinChange);
    formTimeoutElement.addEventListener(`change`, onTimeoutChange);
    formTypeElement.addEventListener(`change`, onFormTypeChange);
    formRoomNumberElement.addEventListener(`change`, onRoomNumberChange);
    formRoomCapacityElement.addEventListener(`change`, onRoomCapacityChange);
  }
});
