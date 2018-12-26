'use strict';

(function () {
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

  window.util = {
    titles: titles,
    types: types,
    features: features,
    checkinsCheckouts: checkinsCheckouts,
    pathsPhotos: pathsPhotos,
    getRandomNumber: getRandomNumber,
    getRandomIndexElement: getRandomIndexElement,
    getAvatarUser: getAvatarUser,
    getRandomLength: getRandomLength
  };
})();
