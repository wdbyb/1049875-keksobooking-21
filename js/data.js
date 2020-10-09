'use strict';

(function () {
  const ROOMS_TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const NUMBERS_AVATAR = [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`];
  const MAX_OFFERS = 8;
  const offers = [];

  function createOffer() {
    const location = {
      x: window.util.getRandomNumberFromRange(30, 1170),
      y: window.util.getRandomNumberFromRange(160, 600),
    };

    return {
      author: {
        avatar: `img/avatars/user` + NUMBERS_AVATAR[window.util.getRandomNumber(NUMBERS_AVATAR.length)] + `.png`,
      },
      offer: {
        title: `Заголовок!`,
        address: location.x + `, ` + location.y,
        price: 5000,
        type: ROOMS_TYPE[window.util.getRandomNumber(ROOMS_TYPE.length)],
        rooms: 3,
        guests: 3,
        checkin: `12:00`,
        checkout: `13:00`,
        features: window.util.getRandomItemsFromArray(FEATURES),
        description: `Не очень длинное описание.`,
        photos: window.util.getRandomItemsFromArray(PHOTOS),
      },
      location,
    };
  }

  for (let i = 0; i < MAX_OFFERS; i++) {
    offers.push(createOffer());
  }

  window.data = {
    offers: offers,
  };
})();
