'use strict';

(function () {
  window.formValidity.formAddressElement.setAttribute(`value`, window.dragging.formAddressX + `, ` + window.dragging.formAddressY);

  window.map.mapPinMainElement.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      const isPinsOnMap = window.map.mapElement.querySelector(`.map__pin:not(.map__pin--main)`);
      if (isPinsOnMap === null) {
        window.mainPinListener.onMainPinActivated();
      }
    }
  });

  window.map.mapPinMainElement.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      const isPinsOnMap = window.map.mapElement.querySelector(`.map__pin:not(.map__pin--main)`);
      if (isPinsOnMap === null) {
        window.mainPinListener.onMainPinActivated();
      }
    }
  });
})();
