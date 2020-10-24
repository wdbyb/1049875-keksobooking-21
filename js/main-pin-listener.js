'use strict';

(function () {
  function onMainPinActivated() {
    window.map.mapElement.classList.remove(`map--faded`);
    window.formValidity.adFormElement.classList.remove(`ad-form--disabled`);
    window.resetPage.elementsDisableEnable.forEach(function (element) {
      window.util.toggleDisabled(element, false);
    });
    window.map.mapPinsElement.appendChild(window.map.getPinsFragment());
    window.formValidity.formTimeinElement.addEventListener(`change`, window.formValidity.onTimeinChange);
    window.formValidity.formTimeoutElement.addEventListener(`change`, window.formValidity.onTimeoutChange);
    window.formValidity.formTypeElement.addEventListener(`change`, window.formValidity.onFormTypeChange);
    window.formValidity.formRoomNumberElement.addEventListener(`change`, window.formValidity.onRoomNumberChange);
    window.formValidity.formRoomCapacityElement.addEventListener(`change`, window.formValidity.onRoomCapacityChange);
  }

  window.mainPinListener = {
    onMainPinActivated: onMainPinActivated,
  };
})();
