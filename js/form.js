'use strict';

(function () {
  const MIN_PRICE_BUNGALOW = 0;
  const MIN_PRICE_FLAT = 1000;
  const MIN_PRICE_HOUSE = 5000;
  const MIN_PRICE_PALACE = 10000;
  const VALUE_OF_HUNDRED_ROOMS = 100;
  const VALUE_OF_NOT_FOR_GUESTS = 0;
  const MAIN_PIN_HALF_WIDTH = 31;
  const MAIN_PIN_HEIGHT = 84;
  const mapElement = document.querySelector(`.map`);
  const adFormElement = document.querySelector(`.ad-form`);
  const mapPinMainElement = mapElement.querySelector(`.map__pin--main`);
  const formAddressElement = adFormElement.querySelector(`#address`);
  const formTypeElement = adFormElement.querySelector(`#type`);
  const formPriceElement = adFormElement.querySelector(`#price`);
  const formTimeinElement = adFormElement.querySelector(`#timein`);
  const formTimeoutElement = adFormElement.querySelector(`#timeout`);
  const formRoomCapacityElement = adFormElement.querySelector(`#capacity`);
  const formRoomNumberElement = adFormElement.querySelector(`#room_number`);
  const formAllFieldsetsElements = adFormElement.querySelectorAll(`.ad-form__element`);
  const formHeaderFieldsetElement = adFormElement.querySelector(`.ad-form-header`);
  const formAddressX = parseInt(mapPinMainElement.style.left, 10) + MAIN_PIN_HALF_WIDTH;
  const formAddressY = parseInt(mapPinMainElement.style.top, 10) + MAIN_PIN_HEIGHT;

  function onRoomNumberChange() {
    if (+formRoomCapacityElement.value === VALUE_OF_NOT_FOR_GUESTS && +formRoomNumberElement.value !== VALUE_OF_HUNDRED_ROOMS) {
      formRoomNumberElement.setCustomValidity(`Только 100 комнат!`);
    } else if (+formRoomNumberElement.value === VALUE_OF_HUNDRED_ROOMS && +formRoomCapacityElement.value !== VALUE_OF_NOT_FOR_GUESTS) {
      formRoomCapacityElement.setCustomValidity(`Не для гостей`);
    } else if (formRoomNumberElement.value < formRoomCapacityElement.value) {
      formRoomCapacityElement.setCustomValidity(`Понижай или проиграешь.`);
      formRoomNumberElement.setCustomValidity(``);
    } else {
      formRoomCapacityElement.setCustomValidity(``);
      formRoomNumberElement.setCustomValidity(``);
    }
  }

  function onFormTypeChange() {
    switch (formTypeElement.value) {
      case `bungalow`:
        formPriceElement.setAttribute(`placeholder`, MIN_PRICE_BUNGALOW);
        formPriceElement.setAttribute(`min`, MIN_PRICE_BUNGALOW);
        break;
      case `flat`:
        formPriceElement.setAttribute(`placeholder`, MIN_PRICE_FLAT);
        formPriceElement.setAttribute(`min`, MIN_PRICE_FLAT);
        break;
      case `house`:
        formPriceElement.setAttribute(`placeholder`, MIN_PRICE_HOUSE);
        formPriceElement.setAttribute(`min`, MIN_PRICE_HOUSE);
        break;
      case `palace`:
        formPriceElement.setAttribute(`placeholder`, MIN_PRICE_PALACE);
        formPriceElement.setAttribute(`min`, MIN_PRICE_PALACE);
        break;
    }
  }

  function onRoomCapacityChange() {
    if (+formRoomCapacityElement.value === VALUE_OF_NOT_FOR_GUESTS && +formRoomNumberElement.value !== VALUE_OF_HUNDRED_ROOMS) {
      formRoomNumberElement.setCustomValidity(`Только 100 комнат!`);
    } else if (+formRoomNumberElement.value === VALUE_OF_HUNDRED_ROOMS && +formRoomCapacityElement.value !== VALUE_OF_NOT_FOR_GUESTS) {
      formRoomCapacityElement.setCustomValidity(`Не для гостей`);
    } else if (formRoomNumberElement.value < formRoomCapacityElement.value) {
      formRoomCapacityElement.setCustomValidity(`Понижай или проиграешь.`);
      formRoomNumberElement.setCustomValidity(``);
    } else {
      formRoomCapacityElement.setCustomValidity(``);
      formRoomNumberElement.setCustomValidity(``);
    }
  }

  function onTimeinChange() {
    formTimeoutElement.value = formTimeinElement.value;
  }

  function onTimeoutChange() {
    formTimeinElement.value = formTimeoutElement.value;
  }

  window.form = {
    onTimeinChange: onTimeinChange,
    onTimeoutChange: onTimeoutChange,
    onFormTypeChange: onFormTypeChange,
    onRoomNumberChange: onRoomNumberChange,
    onRoomCapacityChange: onRoomCapacityChange,
    formHeaderFieldsetElement: formHeaderFieldsetElement,
    formAllFieldsetsElements: formAllFieldsetsElements,
    adFormElement: adFormElement,
    formAddressX: formAddressX,
    formAddressY: formAddressY,
    formAddressElement: formAddressElement,
    formTimeinElement: formTimeinElement,
    formTimeoutElement: formTimeoutElement,
    formTypeElement: formTypeElement,
    formRoomNumberElement: formRoomNumberElement,
    formRoomCapacityElement: formRoomCapacityElement,
  };
})();
