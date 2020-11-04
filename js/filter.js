'use strict';

(function () {
  const formElement = document.querySelector(`.map__filters`);

  function filter() {
    const offers = window.map.getOffersPlease();
    const filtersFormData = Object.fromEntries(new FormData(formElement).entries());

    const filteredOffers = offers.filter(function (element) {
      return element.offer.type === filtersFormData[`housing-type`] || filtersFormData[`housing-type`] === `any`;
    }).filter(function (element) {
      switch (filtersFormData[`housing-price`]) {
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
      return element.offer.rooms === parseInt(filtersFormData[`housing-rooms`], 10) || filtersFormData[`housing-rooms`] === `any`;
    }).filter(function (element) {
      return element.offer.guests === parseInt(filtersFormData[`housing-guests`], 10) || filtersFormData[`housing-guests`] === `any`;
    }).filter(function (element) {
      return element.offer.features.indexOf(`wifi`) !== -1 || filtersFormData[`features-wifi`] === undefined;
    }).filter(function (element) {
      return element.offer.features.indexOf(`dishwasher`) !== -1 || filtersFormData[`features-dishwasher`] === undefined;
    }).filter(function (element) {
      return element.offer.features.indexOf(`parking`) !== -1 || filtersFormData[`features-parking`] === undefined;
    }).filter(function (element) {
      return element.offer.features.indexOf(`washer`) !== -1 || filtersFormData[`features-washer`] === undefined;
    }).filter(function (element) {
      return element.offer.features.indexOf(`elevator`) !== -1 || filtersFormData[`features-elevator`] === undefined;
    }).filter(function (element) {
      return element.offer.features.indexOf(`conditioner`) !== -1 || filtersFormData[`features-conditioner`] === undefined;
    });

    window.resetPage.removePinsOnMap();

    window.resetPage.removeCardOnMap();

    const fragment = window.map.renderPins(filteredOffers);

    window.map.mapPinsElement.appendChild(fragment);
  }

  const debouncedFilter = window.debounce(filter);

  formElement.addEventListener(`change`, debouncedFilter);
})();
