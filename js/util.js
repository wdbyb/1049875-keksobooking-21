'use strict';

(function () {
  const mapElement = document.querySelector(`.map`);

  function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function getRandomNumberFromRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getRandomItemsFromArray(arr) {
    const myArr = arr.slice(0);
    const randomLength = getRandomNumber(myArr.length + 1);

    for (let i = 0; i < randomLength; i++) {
      myArr.splice(getRandomNumber(myArr.length), 1);
    }

    return myArr;
  }

  function toggleDisabled(element, state) {
    element.toggleAttribute(`disabled`, state);
  }

  function removeCardOnMap() {
    const cardOnMapElement = mapElement.querySelector(`.map__card`);

    if (cardOnMapElement !== null) {
      cardOnMapElement.remove();
    }
  }

  function removePinsOnMap() {
    const pinsOnMapElements = mapElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    pinsOnMapElements.forEach(function (element) {
      element.remove();
    });
  }

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomNumberFromRange: getRandomNumberFromRange,
    getRandomItemsFromArray: getRandomItemsFromArray,
    toggleDisabled: toggleDisabled,
    removeCardOnMap: removeCardOnMap,
    removePinsOnMap: removePinsOnMap,
  };
})();
