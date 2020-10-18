'use strict';

(function () {
  window.map.mapPinMainElement.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      window.mainPinListener.onMainPinActivated();
    }
  });

  window.map.mapPinMainElement.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.mainPinListener.onMainPinActivated();
    }
  });
})();
