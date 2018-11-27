'use strict';

var INCREASE_INDEX = 1;
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

//Генерируем случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

//Генерируем случайный элемент массива
var getRandomIndexElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

//Генерируем случайную длинну
var getRandomLength = function (array) {
  return array.slice(getRandomNumber(0, array.length - 1));
};

var generateAdvert = function(advertsCount) {
  var manyAdverts = [];

  //Генерируем аватар пользователя
  var getAvatarUser = function (indexAvatarImage) {
    var auxiliaryIndex = indexAvatarImage + 1;
    return 'img/avatars/user0' + auxiliaryIndex + '.png';
  };

  for (var i = 0; i < advertsCount; i++) {
    var x = getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X);
    var y = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);

    var oneAdvert = {
      author: {
        avatar: getAvatarUser(i)
      },

      offer: {
        title: titles[i],
        address: x + ',' + y,
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
    manyAdverts.push(oneAdvert);
  }
  return  manyAdverts;
}
