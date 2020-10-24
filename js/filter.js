'use strict';

(function () {
  const formElement = document.querySelector(`.map__filters`);

  formElement.addEventListener(`change`, function () {
    const offers = window.map.getOffersPlease();
    const foo = Object.fromEntries(new FormData(formElement).entries());

    const filteredOffers = offers.filter(function (element) {
      return element.offer.type === foo[`housing-type`] || foo[`housing-type`] === `any`;
    }).filter(function (element) {
      switch (foo[`housing-price`]) {
        case window.constants.HousingPrice.LOW:
          return element.offer.price < window.constants.HOUSE_PRICE_MIN;
        case window.constants.HousingPrice.MIDDLE:
          return element.offer.price >= window.constants.HOUSE_PRICE_MIN && element.offer.price <= window.constants.HOUSE_PRICE_MAX;
        case window.constants.HousingPrice.HIGH:
          return element.offer.price > window.constants.HOUSE_PRICE_MAX;
        default:
          return element;
      }
    }).filter(function (element) {
      return element.offer.rooms === parseInt(foo[`housing-rooms`], 10) || foo[`housing-rooms`] === `any`;
    }).filter(function (element) {
      return element.offer.guests === parseInt(foo[`housing-guests`], 10) || foo[`housing-guests`] === `any`;
    }).filter(function (element) {
      return element.offer.features.indexOf(`wifi`) !== -1 || foo[`features-wifi`] === undefined;
    }).filter(function (element) {
      return element.offer.features.indexOf(`dishwasher`) !== -1 || foo[`features-dishwasher`] === undefined;
    }).filter(function (element) {
      return element.offer.features.indexOf(`parking`) !== -1 || foo[`features-parking`] === undefined;
    }).filter(function (element) {
      return element.offer.features.indexOf(`washer`) !== -1 || foo[`features-washer`] === undefined;
    }).filter(function (element) {
      return element.offer.features.indexOf(`elevator`) !== -1 || foo[`features-elevator`] === undefined;
    }).filter(function (element) {
      return element.offer.features.indexOf(`conditioner`) !== -1 || foo[`features-conditioner`] === undefined;
    });

    window.resetPage.removePinsOnMap();

    window.resetPage.removeCardOnMap();

    const fragment = window.map.renderPins(filteredOffers);

    window.map.mapPinsElement.appendChild(fragment);
  });
})();
