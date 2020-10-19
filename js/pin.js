'use strict';

(function () {
  const mapElement = document.querySelector(`.map`);
  const pinTemplateElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const filtersContainerElement = mapElement.querySelector(`.map__filters-container`);

  function renderPin(ad) {
    const pinElement = pinTemplateElement.cloneNode(true);
    const img = pinElement.querySelector(`img`);

    pinElement.style.left = ad.location.x + window.constants.PIN_HALF_WIDTH + `px`;
    pinElement.style.top = ad.location.y + window.constants.PIN_HEIGHT + `px`;
    img.src = ad.author.avatar;
    img.alt = ad.offer.title;

    pinElement.addEventListener(`click`, function () {
      window.util.removeCardOnMap();

      mapElement.insertBefore(window.card.renderCard(ad), filtersContainerElement);
    });

    return pinElement;
  }

  window.pin = {
    renderPin: renderPin,
  };
})();
