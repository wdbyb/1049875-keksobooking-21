'use strict';

(function () {
  const adFormElement = document.querySelector(`.ad-form`);
  const mapElement = document.querySelector(`.map`);
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

  window.resetPage = {
    elementsDisableEnable: elementsDisableEnable,
  };
})();
