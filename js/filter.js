'use strict';

(function () {
  const housingTypeElement = document.querySelector(`#housing-type`);

  function updatePins() {
    const offers = window.map.getOffersPlease();

    const sameHouseTypeOffers = offers.filter(function (element) {
      if (housingTypeElement.value === `any`) {
        return element;
      } else {
        return element.offer.type === housingTypeElement.value;
      }
    });

    const mapPinsElements = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    mapPinsElements.forEach(function (element) {
      element.remove();
    });

    const cardOnMapElement = document.querySelector(`.map__card`);

    if (cardOnMapElement !== null) {
      cardOnMapElement.remove();
    }

    const fragment = window.map.renderPins(sameHouseTypeOffers);

    window.map.mapPinsElement.appendChild(fragment);
  }

  housingTypeElement.addEventListener(`change`, function () {
    updatePins();
  });
})();
