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
    location: location,
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
