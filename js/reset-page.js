'use strict';

(function () {
  const adFormElement = document.querySelector(`.ad-form`);
  const mapElement = document.querySelector(`.map`);
  const mainPinElement = mapElement.querySelector(`.map__pin--main`);
  const mapFiltersAllElements = mapElement.querySelectorAll(`.map__filter`);
  const formAllFieldsetsElements = adFormElement.querySelectorAll(`.ad-form__element`);
  const formHeaderFieldsetElement = adFormElement.querySelector(`.ad-form-header`);
  const mapFeaturesElement = document.querySelector(`.map__features`);
  const elementsDisableEnable = [];

  elementsDisableEnable.push(mapFeaturesElement, formHeaderFieldsetElement);

  mapFiltersAllElements.forEach(function (element) {
    elementsDisableEnable.push(element);
  });

  formAllFieldsetsElements.forEach(function (element) {
    elementsDisableEnable.push(element);
  });

  elementsDisableEnable.forEach(function (element) {
    window.util.toggleDisabled(element, true);
  });

  function removeCardOnMap() {
    const cardOnMapElement = mapElement.querySelector(`.map__card`);

    if (cardOnMapElement !== null) {
      cardOnMapElement.remove();
    }
  }

  function removePinsOnMap() {
    const pinsOnMapElements = mapElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    pinsOnMapElements.forEach(function (element) {
      element.remove();
    });
  }

  function setMainPinCenter() {
    mainPinElement.style.left = window.constants.MainPinDefaultPosition.X + `px`;
    mainPinElement.style.top = window.constants.MainPinDefaultPosition.Y + `px`;
  }

  window.resetPage = {
    elementsDisableEnable: elementsDisableEnable,
    removeCardOnMap: removeCardOnMap,
    removePinsOnMap: removePinsOnMap,
    setMainPinCenter: setMainPinCenter,
  };
})();
