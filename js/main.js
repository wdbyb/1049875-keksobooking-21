'use strict';

(function () {
  const elementsDisableEnable = [];

  elementsDisableEnable.push(window.map.mapFeaturesElement, window.form.formHeaderFieldsetElement);

  window.map.mapFiltersAllElements.forEach(function (element) {
    elementsDisableEnable.push(element);
  });

  window.form.formAllFieldsetsElements.forEach(function (element) {
    elementsDisableEnable.push(element);
  });

  elementsDisableEnable.forEach(function (element) {
    window.util.toggleDisabled(element, true);
  });

  window.map.mapPinMainElement.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      window.mainPinListener.listenMainPin();
    }
  });

  window.map.mapPinMainElement.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.mainPinListener.listenMainPin();
    }
  });

  window.main = {
    elementsDisableEnable: elementsDisableEnable,
  };
})();
