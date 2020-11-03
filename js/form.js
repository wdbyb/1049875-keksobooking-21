'use strict';

(function () {
  const mapElement = document.querySelector(`.map`);
  const mapFiltersElement = mapElement.querySelector(`.map__filters`);
  const adFormElement = document.querySelector(`.ad-form`);
  const formResetButtonElement = adFormElement.querySelector(`.ad-form__reset`);

  formResetButtonElement.addEventListener(`click`, function () {
    adFormElement.reset();
    mapFiltersElement.reset();
    window.formValidity.onFormTypeChange();
    mapElement.classList.add(`map--faded`);
    adFormElement.classList.add(`ad-form--disabled`);
    window.resetPage.elementsDisableEnable.forEach(function (element) {
      window.util.toggleDisabled(element, true);
    });
    window.resetPage.removeCardOnMap();
    window.resetPage.removePinsOnMap();
    window.resetPage.setMainPinCenter();
    window.formValidity.formAddressElement.setAttribute(`value`, window.dragging.formAddressX + `, ` + window.dragging.formAddressY);
  });

  function successFormHandler() {
    adFormElement.reset();
    mapFiltersElement.reset();
    window.formValidity.onFormTypeChange();
    mapElement.classList.add(`map--faded`);
    adFormElement.classList.add(`ad-form--disabled`);
    window.resetPage.elementsDisableEnable.forEach(function (element) {
      window.util.toggleDisabled(element, true);
    });
    window.resetPage.removeCardOnMap();
    window.resetPage.removePinsOnMap();
    window.resetPage.setMainPinCenter();
    window.formValidity.formAddressElement.setAttribute(`value`, window.dragging.formAddressX + `, ` + window.dragging.formAddressY);
  }

  adFormElement.addEventListener(`submit`, function (evt) {
    window.backend.save(new FormData(adFormElement), successFormHandler, window.formMessages.showErrorFormMessage, true);
    evt.preventDefault();
  });
})();
