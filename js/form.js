'use strict';

(function () {
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
  const formAddressX = parseInt(mapPinMainElement.style.left, 10) + window.constants.MAIN_PIN_HALF_WIDTH;
  const formAddressY = parseInt(mapPinMainElement.style.top, 10) + window.constants.MAIN_PIN_HEIGHT;

  function onRoomNumberChange() {
    if (+formRoomCapacityElement.value === window.constants.VALUE_OF_NOT_FOR_GUESTS && +formRoomNumberElement.value !== window.constants.VALUE_OF_HUNDRED_ROOMS) {
      formRoomNumberElement.setCustomValidity(`Только 100 комнат!`);
    } else if (+formRoomNumberElement.value === window.constants.VALUE_OF_HUNDRED_ROOMS && +formRoomCapacityElement.value !== window.constants.VALUE_OF_NOT_FOR_GUESTS) {
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
        formPriceElement.setAttribute(`placeholder`, window.constants.MIN_PRICE_BUNGALOW);
        formPriceElement.setAttribute(`min`, window.constants.MIN_PRICE_BUNGALOW);
        break;
      case `flat`:
        formPriceElement.setAttribute(`placeholder`, window.constants.MIN_PRICE_FLAT);
        formPriceElement.setAttribute(`min`, window.constants.MIN_PRICE_FLAT);
        break;
      case `house`:
        formPriceElement.setAttribute(`placeholder`, window.constants.MIN_PRICE_HOUSE);
        formPriceElement.setAttribute(`min`, window.constants.MIN_PRICE_HOUSE);
        break;
      case `palace`:
        formPriceElement.setAttribute(`placeholder`, window.constants.MIN_PRICE_PALACE);
        formPriceElement.setAttribute(`min`, window.constants.MIN_PRICE_PALACE);
        break;
    }
  }

  function onRoomCapacityChange() {
    if (+formRoomCapacityElement.value === window.constants.VALUE_OF_NOT_FOR_GUESTS && +formRoomNumberElement.value !== window.constants.VALUE_OF_HUNDRED_ROOMS) {
      formRoomNumberElement.setCustomValidity(`Только 100 комнат!`);
    } else if (+formRoomNumberElement.value === window.constants.VALUE_OF_HUNDRED_ROOMS && +formRoomCapacityElement.value !== window.constants.VALUE_OF_NOT_FOR_GUESTS) {
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
