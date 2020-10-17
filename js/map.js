'use strict';

(function () {
  const mapElement = document.querySelector(`.map`);
  const mapFiltersElement = document.querySelector(`.map__filters`);
  const mapFiltersAllElements = mapFiltersElement.querySelectorAll(`.map__filter`);
  const mapFeaturesElement = document.querySelector(`.map__features`);
  const mapPinMainElement = mapElement.querySelector(`.map__pin--main`);
  const mapPinsElement = mapElement.querySelector(`.map__pins`);
  let offersData = [];

  function renderPins(arr) {
    const fragment = document.createDocumentFragment();

    arr.forEach(function (element) {
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

  window.map = {
    getPinsFragment: getPinsFragment,
    mapFeaturesElement: mapFeaturesElement,
    mapFiltersAllElements: mapFiltersAllElements,
    mapPinMainElement: mapPinMainElement,
    mapElement: mapElement,
    mapPinsElement: mapPinsElement,
  };
})();
