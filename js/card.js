'use strict';

(function () {
  const cardTemplateElement = document.querySelector(`#card`).content.querySelector(`.popup`);

  function renderCard(ad) {
    const element = cardTemplateElement.cloneNode(true);
    const titleElement = element.querySelector(`.popup__title`);
    const addressElement = element.querySelector(`.popup__text--address`);
    const priceElement = element.querySelector(`.popup__text--price`);
    const typeElement = element.querySelector(`.popup__type`);
    const capacityElement = element.querySelector(`.popup__text--capacity`);
    const timeElement = element.querySelector(`.popup__text--time`);
    const featuresElement = element.querySelector(`.popup__features`);
    const descriptionElement = element.querySelector(`.popup__description`);
    const avatarElement = element.querySelector(`.popup__avatar`);
    const photosElement = element.querySelector(`.popup__photos`);
    const photoTemplateElement = photosElement.querySelector(`.popup__photo`);
    const popupCloseElement = element.querySelector(`.popup__close`);
    const offerTypes = {
      flat: `Квартира`,
      bungalow: `Бунгало`,
      house: `Дом`,
      palace: `Дворец`,
    };

    addressElement.textContent = ad.offer.address;
    priceElement.textContent = ad.offer.price + `₽/ночь`;
    titleElement.textContent = ad.offer.title;
    capacityElement.textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
    timeElement.textContent = `Заезд после ` + ad.offer.checkin + `, выезд до ` + ad.offer.checkout;
    descriptionElement.textContent = ad.offer.description;
    avatarElement.src = ad.author.avatar;
    typeElement.textContent = offerTypes[ad.offer.type];

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
      element.classList.add(`hidden`);
    });

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        element.classList.add(`hidden`);
      }
    });

    return element;
  }

  window.card = {
    renderCard: renderCard,
  };
})();
