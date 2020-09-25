const map = document.querySelector(`.map`);

map.classList.remove(`map--faded`);

const ROOMS_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const NUMBERS_AVATAR = [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`];

const getRandom = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomArbitrary = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const pins = [];

const getRandomItems = function (array) {
  const randomLength = getRandom(array.length);
  const randomItems = [];

  for (let i = 0; i < randomLength; i++) {
    randomItems.push(array[i]);
  }

  return randomItems;
};

const createPins = function () {
  const location = {
    x: getRandomArbitrary(30, 1170),
    y: getRandomArbitrary(160, 600),
  };

  return {
    author: {
      avatar: `img/avatars/user` + NUMBERS_AVATAR[getRandom(NUMBERS_AVATAR.length)] + `.png`,
    },
    offer: {
      title: `Заголовок!`,
      address: location.x + `, ` + location.y,
      price: 5000,
      type: ROOMS_TYPE[getRandom(ROOMS_TYPE.length)],
      rooms: 3,
      guests: 3,
      checkin: `12:00`,
      checkout: `13:00`,
      features: getRandomItems(FEATURES),
      description: `Не очень длинное описание.`,
      photos: getRandomItems(PHOTOS),
    },
    location: location,
  };
};


// pins.push(createPins());
// pins.push(createPins());
// console.log(pins);
