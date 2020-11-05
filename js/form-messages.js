'use strict';

(function () {
  const formSuccessMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const formSuccessMessageElement = formSuccessMessageTemplate.cloneNode(true);
  const formErrorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const formErrorMessageElement = formErrorMessageTemplate.cloneNode(true);

  document.querySelector(`main`).appendChild(formSuccessMessageElement).classList.add(`hidden`);
  document.querySelector(`main`).appendChild(formErrorMessageElement).classList.add(`hidden`);

  function messageOnEscPress(evt) {
    if (evt.key === `Escape`) {
      formSuccessMessageElement.classList.add(`hidden`);

      document.removeEventListener(`keydown`, messageOnEscPress);

      document.removeEventListener(`click`, messageOnClick);
    }
  }

  function messageOnClick() {
    formSuccessMessageElement.classList.add(`hidden`);

    document.removeEventListener(`keydown`, messageOnEscPress);

    document.removeEventListener(`click`, messageOnClick);
  }

  function messageClose() {
    formSuccessMessageElement.classList.remove(`hidden`);

    document.addEventListener(`keydown`, messageOnEscPress);

    document.addEventListener(`click`, messageOnClick);
  }

  function showSuccessFormMessage() {
    messageClose();
  }

  function showErrorFormMessage() {
    messageClose();
  }

  window.formMessages = {
    showSuccessFormMessage: showSuccessFormMessage,
    showErrorFormMessage: showErrorFormMessage,
  };
})();
