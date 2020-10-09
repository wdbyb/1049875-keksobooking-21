'use strict';

(function () {
  const PIN_HALF_WIDTH = 20;
  const PIN_HEIGHT = 40;
  const mapElement = document.querySelector(`.map`);
  const pinTemplateElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const filtersContainerElement = mapElement.querySelector(`.map__filters-container`);

  function renderPin(ad) {
    const element = pinTemplateElement.cloneNode(true);
    const img = element.querySelector(`img`);

    element.style.left = ad.location.x + PIN_HALF_WIDTH + `px`;
    element.style.top = ad.location.y + PIN_HEIGHT + `px`;
    img.src = ad.author.avatar;
    img.alt = ad.offer.title;

    element.addEventListener(`click`, function () {
      const cardOnMapElement = mapElement.querySelector(`.map__card`);

      if (cardOnMapElement !== null) {
        cardOnMapElement.remove();
      }

      mapElement.insertBefore(window.card.renderCard(ad), filtersContainerElement);
    });

    return element;
  }

  function renderPins(arr) {
    const fragment = document.createDocumentFragment();

    arr.forEach(function (element) {
      fragment.appendChild(renderPin(element));
    });

    return fragment;
  }

  const pinsFragment = renderPins(window.data.offers);

  window.pin = {
    pinsFragment: pinsFragment,
  };
})();
