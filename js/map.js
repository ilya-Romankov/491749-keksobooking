'use strict';

var ADVERTISING_COUNT = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var LOCATION_MIN_X = 300;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_X = 900;
var LOCATION_MAX_Y = 630;

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var types = ['palace', 'flat', 'house', 'bungalo'];

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var checkinsCheckouts = ['12:00', '13:00', '14:00'];

var pathsPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

//  Генерируем случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

//  Генерируем случайный элемент массива
var getRandomIndexElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Генерируем аватар пользователя

var getAvatarUser = function (indexAvatarImage) {
  var auxiliaryIndex = indexAvatarImage + 1;
  return 'img/avatars/user0' + auxiliaryIndex + '.png';
};

//  Генерируем случайную длинну
var getRandomLength = function (array) {
  return array.slice(getRandomNumber(0, array.length - 1));
};

var generateAdvert = function (advertsCount) {
  var adverts = [];

  for (var i = 0; i < advertsCount; i++) {
    var x = getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X);
    var y = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);

    var oneAdvert = {
      author: {
        avatar: getAvatarUser(i)
      },

      offer: {
        title: titles[i],
        address: x + ', ' + y,
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: getRandomIndexElement(types),
        rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        checkin: getRandomIndexElement(checkinsCheckouts),
        checkout: getRandomIndexElement(checkinsCheckouts),
        features: getRandomLength(features),
        description: '',
        photos: pathsPhotos
      },

      location: {
        x: x,
        y: y
      }
    };
    adverts.push(oneAdvert);
  }
  return adverts;
};


//  Отрисуем метки
var adverts = generateAdvert(ADVERTISING_COUNT);

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var pinElements = document.querySelector('.map__pins');

var getPin = function (charactersPin) {
  var pinOneElement = pinTemplate.cloneNode(true);
  pinOneElement.style = 'left:' + charactersPin.location.x + 'px;' + 'top:' + charactersPin.location.y + 'px;';
  pinOneElement.querySelector('img').src = charactersPin.author.avatar;
  pinOneElement.querySelector('img').alt = charactersPin.offer.title;
  return pinOneElement;
};

var getPinFragment = function (advertes) {
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < advertes.length; i++) {
    pinFragment.appendChild(getPin(advertes[i]));
  }
  pinElements.appendChild(pinFragment);
};

getPinFragment(adverts);


// Отрисуем объявления

var getPhotos = function (photosArr) {
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
};

var getFeatures = function (featuresArr) {
  var featuresFragment = document.createDocumentFragment();
  for (var i = 0; i < featuresArr.length; i++) {
    var featuresOneElement = document.createElement('li');
    featuresOneElement.className = 'popup__feature popup__feature--' + featuresArr[i];
    featuresFragment.appendChild(featuresOneElement);
  }
  return featuresFragment;
};

var getCard = function (charactersCard) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardOneElement = cardTemplate.cloneNode(true);
  cardOneElement.querySelector('.popup__avatar').src = charactersCard.author.avatar;
  cardOneElement.querySelector('.popup__title').textContent = charactersCard.offer.title;
  cardOneElement.querySelector('.popup__text--address').textContent = charactersCard.offer.address;
  cardOneElement.querySelector('.popup__text--price').textContent = charactersCard.offer.price + '/ночь';
  cardOneElement.querySelector('.popup__type').textContent = charactersCard.offer.type;
  cardOneElement.querySelector('.popup__text--capacity').textContent = charactersCard.offer.rooms + 'комнаты для ' + charactersCard.offer.rooms + 'гостей';
  cardOneElement.querySelector('.popup__text--time').textContent = 'Заезд до ' + charactersCard.offer.checkin + ', выезд после ' + charactersCard.offer.checkout;
  cardOneElement.querySelector('.popup__features').textContent = '';
  cardOneElement.querySelector('.popup__features').appendChild(getFeatures(charactersCard.offer.features));
  cardOneElement.querySelector('.popup__description').textContent = charactersCard.offer.description;
  cardOneElement.querySelector('.popup__photos').textContent = '';
  cardOneElement.querySelector('.popup__photos').appendChild(getPhotos(charactersCard.offer.photos));
  return cardOneElement;
};

var getCardFragment = function () {
  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(getCard(adverts[2]));
  document.querySelector('.map').insertBefore(cardFragment, document.querySelector('.map__filter-container'));
};

getCardFragment();
