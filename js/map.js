'use strict';

(function () {
  const mapElement = document.querySelector(`.map`);
  const mapFiltersElement = document.querySelector(`.map__filters`);
  const mapFiltersAllElements = mapFiltersElement.querySelectorAll(`.map__filter`);
  const mapFeaturesElement = document.querySelector(`.map__features`);
  const mapPinMainElement = mapElement.querySelector(`.map__pin--main`);
  const mapPinsElement = mapElement.querySelector(`.map__pins`);

  window.map = {
    mapFeaturesElement: mapFeaturesElement,
    mapFiltersAllElements: mapFiltersAllElements,
    mapPinMainElement: mapPinMainElement,
    mapElement: mapElement,
    mapPinsElement: mapPinsElement,
  };
})();
