'use strict';

(function () {
  const mapElement = document.querySelector(`.map`);
  const pinTemplateElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const filtersContainerElement = mapElement.querySelector(`.map__filters-container`);

  function removeCardAndClass() {
    window.resetPage.removeCardOnMap();

    const element = document.querySelector(`.map__pin--active`);

    if (element !== null) {
      element.classList.remove(`map__pin--active`);
    }
  }

  function renderPin(ad) {
    const pinElement = pinTemplateElement.cloneNode(true);
    const img = pinElement.querySelector(`img`);

    pinElement.style.left = ad.location.x + window.constants.PIN_HALF_WIDTH + `px`;
    pinElement.style.top = ad.location.y + window.constants.PIN_HEIGHT + `px`;
    img.src = ad.author.avatar;
    img.alt = ad.offer.title;

    pinElement.addEventListener(`click`, function () {
      removeCardAndClass();

      pinElement.classList.add(`map__pin--active`);

      mapElement.insertBefore(window.card.renderCard(ad), filtersContainerElement);
    });

    pinElement.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        removeCardAndClass();

        pinElement.classList.add(`map__pin--active`);

        mapElement.insertBefore(window.card.renderCard(ad), filtersContainerElement);
      }
    });

    return pinElement;
  }

  window.pin = {
    renderPin: renderPin,
  };
})();
