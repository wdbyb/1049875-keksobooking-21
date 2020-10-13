'use strict';

(function () {
  function listenMainPin() {
    window.map.mapElement.classList.remove(`map--faded`);
    window.form.adFormElement.classList.remove(`ad-form--disabled`);
    window.main.elementsDisableEnable.forEach(function (element) {
      window.util.toggleDisabled(element, false);
    });
    window.map.mapPinsElement.appendChild(window.map.pinsFragment);
    window.form.formAddressElement.setAttribute(`placeholder`, window.form.formAddressX + `, ` + window.form.formAddressY);
    window.form.formTimeinElement.addEventListener(`change`, window.form.onTimeinChange);
    window.form.formTimeoutElement.addEventListener(`change`, window.form.onTimeoutChange);
    window.form.formTypeElement.addEventListener(`change`, window.form.onFormTypeChange);
    window.form.formRoomNumberElement.addEventListener(`change`, window.form.onRoomNumberChange);
    window.form.formRoomCapacityElement.addEventListener(`change`, window.form.onRoomCapacityChange);
  }

  window.mainPinListener = {
    listenMainPin: listenMainPin,
  };
})();
