'use strict';

(function () {
  const elementsDisableEnable = [];

  function toggleDisabled(element, state) {
    element.toggleAttribute(`disabled`, state);
  }

  elementsDisableEnable.push(window.map.mapFeaturesElement, window.form.formHeaderFieldsetElement);

  window.map.mapFiltersAllElements.forEach(function (element) {
    elementsDisableEnable.push(element);
  });

  window.form.formAllFieldsetsElements.forEach(function (element) {
    elementsDisableEnable.push(element);
  });

  elementsDisableEnable.forEach(function (element) {
    toggleDisabled(element, true);
  });

  window.map.mapPinMainElement.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      window.map.mapElement.classList.remove(`map--faded`);
      window.form.adFormElement.classList.remove(`ad-form--disabled`);
      elementsDisableEnable.forEach(function (element) {
        toggleDisabled(element, false);
      });
      window.map.mapPinsElement.appendChild(window.pin.pinsFragment);
      window.form.formAddressElement.setAttribute(`placeholder`, window.form.formAddressX + `, ` + window.form.formAddressY);
      window.form.formTimeinElement.addEventListener(`change`, window.form.onTimeinChange);
      window.form.formTimeoutElement.addEventListener(`change`, window.form.onTimeoutChange);
      window.form.formTypeElement.addEventListener(`change`, window.form.onFormTypeChange);
      window.form.formRoomNumberElement.addEventListener(`change`, window.form.onRoomNumberChange);
      window.form.formRoomCapacityElement.addEventListener(`change`, window.form.onRoomCapacityChange);
    }
  });

  window.map.mapPinMainElement.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.map.mapElement.classList.remove(`map--faded`);
      window.form.adFormElement.classList.remove(`ad-form--disabled`);
      elementsDisableEnable.forEach(function (element) {
        toggleDisabled(element, false);
      });
      window.map.mapPinsElement.appendChild(window.pin.pinsFragment);
      window.form.formAddressElement.setAttribute(`placeholder`, window.form.formAddressX + `, ` + window.form.formAddressY);
      window.form.formTimeinElement.addEventListener(`change`, window.form.onTimeinChange);
      window.form.formTimeoutElement.addEventListener(`change`, window.form.onTimeoutChange);
      window.form.formTypeElement.addEventListener(`change`, window.form.onFormTypeChange);
      window.form.formRoomNumberElement.addEventListener(`change`, window.form.onRoomNumberChange);
      window.form.formRoomCapacityElement.addEventListener(`change`, window.form.onRoomCapacityChange);
    }
  });
})();
