'use strict';

(function () {
  const draggedElement = window.map.mapPinMainElement;
  let formAddressX = parseInt(draggedElement.style.left, 10) + window.constants.MAIN_PIN_HALF_WIDTH;
  let formAddressY = parseInt(draggedElement.style.top, 10) + window.constants.MAIN_PIN_HEIGHT;

  draggedElement.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCords = {
      x: evt.clientX,
      y: evt.clientY
    };

    formAddressX = parseInt(draggedElement.style.left, 10) + window.constants.MAIN_PIN_HALF_WIDTH;
    formAddressY = parseInt(draggedElement.style.top, 10) + window.constants.MAIN_PIN_HEIGHT;

    window.formValidity.formAddressElement.setAttribute(`value`, formAddressX + `, ` + formAddressY);

    function onMouseMove(moveEvt) {
      const shift = {
        x: startCords.x - moveEvt.clientX,
        y: startCords.y - moveEvt.clientY
      };

      startCords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((draggedElement.offsetTop - shift.y) <= window.constants.MapRange.MIN_Y || (draggedElement.offsetTop - shift.y) >= window.constants.MapRange.MAX_Y) {
        draggedElement.style.top = draggedElement.offsetTop + 'px';
      } else {
        draggedElement.style.top = (draggedElement.offsetTop - shift.y) + 'px';
      }

      if ((draggedElement.offsetLeft - shift.x) <= window.constants.MapRange.MIN_X || (draggedElement.offsetLeft - shift.x) >= window.constants.MapRange.MAX_X) {
        draggedElement.style.left = draggedElement.offsetLeft + 'px';
      } else {
        draggedElement.style.left = (draggedElement.offsetLeft - shift.x) + 'px';
      }

      formAddressX = parseInt(draggedElement.style.left, 10) + window.constants.MAIN_PIN_HALF_WIDTH;
      formAddressY = parseInt(draggedElement.style.top, 10) + window.constants.MAIN_PIN_HEIGHT;

      window.formValidity.formAddressElement.setAttribute(`value`, formAddressX + `, ` + formAddressY);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    }

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.dragging = {
    formAddressX: formAddressX,
    formAddressY: formAddressY,
  };
})();
