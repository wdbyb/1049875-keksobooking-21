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

    window.util.removePinsOnMap();

    window.util.removeCardOnMap();

    const fragment = window.map.renderPins(sameHouseTypeOffers);

    window.map.mapPinsElement.appendChild(fragment);
  }

  housingTypeElement.addEventListener(`change`, function () {
    updatePins();
  });
})();
