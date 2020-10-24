'use strict';

(function () {
  const mapElement = document.querySelector(`.map`);
  const mapPinMainElement = mapElement.querySelector(`.map__pin--main`);
  const mapPinsElement = mapElement.querySelector(`.map__pins`);
  let offersData = [];

  function renderPins(arr) {
    const fragment = document.createDocumentFragment();

    arr.slice(0, window.constants.MAX_OFFERS).forEach(function (element) {
      fragment.appendChild(window.pin.renderPin(element));
    });

    return fragment;
  }

  function onDataLoadSuccess(arr) {
    offersData = arr;
  }

  function getOffersData() {
    window.backend.load(onDataLoadSuccess, window.errorMessage.errorHandler, false);
  }

  getOffersData();

  function getPinsFragment() {
    return renderPins(offersData);
  }

  function getOffersPlease() {
    return offersData;
  }

  window.map = {
    renderPins: renderPins,
    getOffersPlease: getOffersPlease,
    getPinsFragment: getPinsFragment,
    mapPinMainElement: mapPinMainElement,
    mapElement: mapElement,
    mapPinsElement: mapPinsElement,
  };
})();
