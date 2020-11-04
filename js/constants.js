'use strict';

(function () {
  const MIN_PRICE_BUNGALOW = 0;
  const MIN_PRICE_FLAT = 1000;
  const MIN_PRICE_HOUSE = 5000;
  const MIN_PRICE_PALACE = 10000;
  const VALUE_OF_HUNDRED_ROOMS = 100;
  const VALUE_OF_NOT_FOR_GUESTS = 0;
  const MAIN_PIN_HALF_WIDTH = 31;
  const MAIN_PIN_HEIGHT = 84;
  const PIN_HALF_WIDTH = 20;
  const PIN_HEIGHT = 40;
  const ROOMS_TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const NUMBERS_AVATAR = [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`];
  const MAX_OFFERS = 5;
  const MIN_MAP_COORD_X = 30;
  const MIN_MAP_COORD_Y = 160;
  const MAX_MAP_COORD_X = 1170;
  const MAX_MAP_COORD_Y = 600;
  const DEBOUNCE_INTERVAL = 500;
  const OfferKeyTypes = {
    FLAT: `flat`,
    BUNGALOW: `bungalow`,
    HOUSE: `house`,
    PALACE: `palace`,
  };
  const OfferTypes = {
    [OfferKeyTypes.FLAT]: `Квартира`,
    [OfferKeyTypes.BUNGALOW]: `Бунгало`,
    [OfferKeyTypes.HOUSE]: `Дом`,
    [OfferKeyTypes.PALACE]: `Дворец`,
  };
  const StatusCode = {
    OK: 200
  };
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const HOUSE_PRICE_MIN = 10000;
  const HOUSE_PRICE_MAX = 50000;
  const HousingPrice = {
    LOW: `low`,
    MIDDLE: `middle`,
    HIGH: `high`
  };
  const MainPinDefaultPosition = {
    X: 570,
    Y: 375,
  };
  const MapRange = {
    MIN_X: 0,
    MAX_X: 1140,
    MIN_Y: 130,
    MAX_Y: 630
  };

  window.constants = {
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    MapRange: MapRange,
    MainPinDefaultPosition: MainPinDefaultPosition,
    HousingPrice: HousingPrice,
    HOUSE_PRICE_MIN: HOUSE_PRICE_MIN,
    HOUSE_PRICE_MAX: HOUSE_PRICE_MAX,
    MIN_PRICE_BUNGALOW: MIN_PRICE_BUNGALOW,
    MIN_PRICE_FLAT: MIN_PRICE_FLAT,
    MIN_PRICE_HOUSE: MIN_PRICE_HOUSE,
    MIN_PRICE_PALACE: MIN_PRICE_PALACE,
    VALUE_OF_HUNDRED_ROOMS: VALUE_OF_HUNDRED_ROOMS,
    VALUE_OF_NOT_FOR_GUESTS: VALUE_OF_NOT_FOR_GUESTS,
    MAIN_PIN_HALF_WIDTH: MAIN_PIN_HALF_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    PIN_HALF_WIDTH: PIN_HALF_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    ROOMS_TYPE: ROOMS_TYPE,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    NUMBERS_AVATAR: NUMBERS_AVATAR,
    MAX_OFFERS: MAX_OFFERS,
    MIN_MAP_COORD_X: MIN_MAP_COORD_X,
    MIN_MAP_COORD_Y: MIN_MAP_COORD_Y,
    MAX_MAP_COORD_X: MAX_MAP_COORD_X,
    MAX_MAP_COORD_Y: MAX_MAP_COORD_Y,
    OfferTypes: OfferTypes,
    StatusCode: StatusCode,
    URL: URL,
  };
})();
