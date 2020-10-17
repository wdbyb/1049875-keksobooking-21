'use strict';

(function () {
  function templateRequest(onSuccess, onError, selector, positionMessage, isForm) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === window.constants.StatusCode.OK) {
        onSuccess(xhr.response);
        if (isForm) {
          xhr.timeout = 5000;
        }
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText, selector, positionMessage);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`, selector, positionMessage);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`, selector, positionMessage);
    });

    xhr.timeout = 10000;

    return xhr;
  }

  function save(data, onSuccess, onError, isForm) {
    const xhr = templateRequest(onSuccess, onError, `.ad-form`, `beforeend`, isForm);

    xhr.open(`POST`, window.constants.URL);

    xhr.send(data);
  }

  function load(onSuccess, onError, isForm) {
    const xhr = templateRequest(onSuccess, onError, `.map__filters-container`, `beforebegin`, isForm);

    xhr.open(`GET`, window.constants.URL + `/data`);

    xhr.send();
  }

  window.backend = {
    save: save,
    load: load,
  };
})();
