'use strict';

(function () {
  const mapElement = document.querySelector(`.map`);
  const mapFiltersElement = document.querySelector(`.map__filters`);
  const mapFiltersAllElements = mapFiltersElement.querySelectorAll(`.map__filter`);
  const mapFeaturesElement = document.querySelector(`.map__features`);
  const mapPinMainElement = mapElement.querySelector(`.map__pin--main`);
  const mapPinsElement = mapElement.querySelector(`.map__pins`);

  function renderPins(arr) {
    const fragment = document.createDocumentFragment();

    arr.forEach(function (element) {
      fragment.appendChild(window.pin.renderPin(element));
    });

    return fragment;
  }

  const pinsFragment = renderPins(window.data.offers);

  window.map = {
    pinsFragment: pinsFragment,
    mapFeaturesElement: mapFeaturesElement,
    mapFiltersAllElements: mapFiltersAllElements,
    mapPinMainElement: mapPinMainElement,
    mapElement: mapElement,
    mapPinsElement: mapPinsElement,
  };
})();
