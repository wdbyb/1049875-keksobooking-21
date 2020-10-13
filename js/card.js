'use strict';

(function () {
  const cardTemplateElement = document.querySelector(`#card`).content.querySelector(`.popup`);

  function renderCard(ad) {
    const cardElement = cardTemplateElement.cloneNode(true);
    const titleElement = cardElement.querySelector(`.popup__title`);
    const addressElement = cardElement.querySelector(`.popup__text--address`);
    const priceElement = cardElement.querySelector(`.popup__text--price`);
    const typeElement = cardElement.querySelector(`.popup__type`);
    const capacityElement = cardElement.querySelector(`.popup__text--capacity`);
    const timeElement = cardElement.querySelector(`.popup__text--time`);
    const featuresElement = cardElement.querySelector(`.popup__features`);
    const descriptionElement = cardElement.querySelector(`.popup__description`);
    const avatarElement = cardElement.querySelector(`.popup__avatar`);
    const photosElement = cardElement.querySelector(`.popup__photos`);
    const photoTemplateElement = photosElement.querySelector(`.popup__photo`);
    const popupCloseElement = cardElement.querySelector(`.popup__close`);

    addressElement.textContent = ad.offer.address;
    priceElement.textContent = ad.offer.price + `₽/ночь`;
    titleElement.textContent = ad.offer.title;
    capacityElement.textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
    timeElement.textContent = `Заезд после ` + ad.offer.checkin + `, выезд до ` + ad.offer.checkout;
    descriptionElement.textContent = ad.offer.description;
    avatarElement.src = ad.author.avatar;
    typeElement.textContent = window.constants.OfferTypes[ad.offer.type];

    ad.offer.photos.forEach((photo) => {
      const photoElement = photoTemplateElement.cloneNode(true);
      photoElement.src = photo;
      photosElement.appendChild(photoElement);
    });

    photoTemplateElement.remove();

    ad.offer.features.forEach(function (feature) {
      featuresElement.querySelector(`.popup__feature--` + feature).classList.remove(`hidden`);
    });

    popupCloseElement.setAttribute(`tabindex`, 0);

    popupCloseElement.addEventListener(`click`, function () {
      cardElement.classList.add(`hidden`);
    });

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        cardElement.classList.add(`hidden`);
      }
    });

    return cardElement;
  }

  window.card = {
    renderCard: renderCard,
  };
})();
