'use strict';

(function () {
  const offers = [];

  function createOffer() {
    const location = {
      x: window.util.getRandomNumberFromRange(window.constants.MIN_MAP_COORD_X, window.constants.MAX_MAP_COORD_X),
      y: window.util.getRandomNumberFromRange(window.constants.MIN_MAP_COORD_Y, window.constants.MAX_MAP_COORD_Y),
    };

    return {
      author: {
        avatar: `img/avatars/user` + window.constants.NUMBERS_AVATAR[window.util.getRandomNumber(window.constants.NUMBERS_AVATAR.length)] + `.png`,
      },
      offer: {
        title: `Заголовок!`,
        address: location.x + `, ` + location.y,
        price: 5000,
        type: window.constants.ROOMS_TYPE[window.util.getRandomNumber(window.constants.ROOMS_TYPE.length)],
        rooms: 3,
        guests: 3,
        checkin: `12:00`,
        checkout: `13:00`,
        features: window.util.getRandomItemsFromArray(window.constants.FEATURES),
        description: `Не очень длинное описание.`,
        photos: window.util.getRandomItemsFromArray(window.constants.PHOTOS),
      },
      location,
    };
  }

  for (let i = 0; i < window.constants.MAX_OFFERS; i++) {
    offers.push(createOffer());
  }

  window.data = {
    offers: offers,
  };
})();
