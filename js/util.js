'use strict';

(function () {
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

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomNumberFromRange: getRandomNumberFromRange,
    getRandomItemsFromArray: getRandomItemsFromArray
  };
})();
