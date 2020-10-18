'use strict';

(function () {
  const formSuccessMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const formSuccessMessageElement = formSuccessMessageTemplate.cloneNode(true);
  const formErrorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const formErrorMessageElement = formErrorMessageTemplate.cloneNode(true);

  document.querySelector(`main`).appendChild(formSuccessMessageElement).classList.add(`hidden`);
  document.querySelector(`main`).appendChild(formErrorMessageElement).classList.add(`hidden`);

  function showSuccessFormMessage() {
    formSuccessMessageElement.classList.remove(`hidden`);

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        formSuccessMessageElement.classList.add(`hidden`);
      }
    });

    document.addEventListener(`click`, function () {
      formSuccessMessageElement.classList.add(`hidden`);
    });
  }

  // showSuccessFormMessage();

  function showErrorFormMessage() {
    formErrorMessageElement.classList.remove(`hidden`);

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        formErrorMessageElement.classList.add(`hidden`);
      }
    });

    document.addEventListener(`click`, function () {
      formErrorMessageElement.classList.add(`hidden`);
    });

    // formErrorButtonElement.addEventListener(`click`, function () {
    //   formSuccessMessageElement.classList.add(`hidden`);
    // });
  }
  // document.querySelector(`main`).appendChild(formSuccessMessageElement);
  // document.querySelector(`main`).appendChild(formErrorMessageElement);

  window.formMessages = {
    showSuccessFormMessage: showSuccessFormMessage,
    showErrorFormMessage: showErrorFormMessage,
  };
})();
