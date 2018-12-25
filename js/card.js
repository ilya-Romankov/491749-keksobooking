'use strict';

(function () {

  window.card = {
    getPhotos: function (photosArr) {
      var photosFragment = document.createDocumentFragment();
      for (var i = 0; i < photosArr.length; i++) {
        var photosTemplate = document.querySelector('#card')
          .content
          .querySelector('.popup__photos');
        var photosOneElement = photosTemplate.cloneNode(true);
        photosOneElement.querySelector('img').src = photosArr[i];
        photosOneElement.querySelector('img').width = 60;
        photosOneElement.querySelector('img').height = 60;
        photosFragment.appendChild(photosOneElement);
      }
      return photosFragment;
    },
    getFeatures: function (featuresArr) {
      var featuresFragment = document.createDocumentFragment();
      for (var i = 0; i < featuresArr.length; i++) {
        var featuresOneElement = document.createElement('li');
        featuresOneElement.className = 'popup__feature popup__feature--' + featuresArr[i];
        featuresFragment.appendChild(featuresOneElement);
      }
      return featuresFragment;
    },
    getCardFragment: function (charactersCard, index) {
      var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
      var cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector('.popup__avatar').src = charactersCard[index].author.avatar;
      cardElement.querySelector('.popup__title').textContent = charactersCard[index].offer.title;
      cardElement.querySelector('.popup__text--address').textContent = charactersCard[index].offer.address;
      cardElement.querySelector('.popup__text--price').textContent = charactersCard[index].offer.price + '$  /ночь';
      cardElement.querySelector('.popup__type').textContent = charactersCard[index].offer.type;
      cardElement.querySelector('.popup__text--capacity').textContent = charactersCard[index].offer.rooms + 'комнаты для ' + charactersCard[index].offer.rooms + 'гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд до ' + charactersCard[index].offer.checkin + ', выезд после ' + charactersCard[index].offer.checkout;
      cardElement.querySelector('.popup__features').textContent = '';
      cardElement.querySelector('.popup__features').appendChild(window.card.getFeatures(charactersCard[index].offer.features));
      cardElement.querySelector('.popup__description').textContent = charactersCard[index].offer.description;
      cardElement.querySelector('.popup__photos').textContent = '';
      cardElement.querySelector('.popup__photos').appendChild(window.card.getPhotos(charactersCard[index].offer.photos));
      return cardElement;
    }
  };
})();
