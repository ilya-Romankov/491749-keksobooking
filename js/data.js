'use strict';

(function () {
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var LOCATION_MIN_X = 300;
  var LOCATION_MIN_Y = 130;
  var LOCATION_MAX_X = 900;
  var LOCATION_MAX_Y = 630;

  var getAvatarUser = window.util.getAvatarUser;
  var getRandomNumber = window.util.getRandomNumber;
  var getRandomIndexElement = window.util.getRandomIndexElement;
  var getRandomLength = window.util.getRandomLength;
  var types = window.util.types;
  var checkinsCheckouts = window.util.checkinsCheckouts;
  var features = window.util.features;
  var pathsPhotos = window.util.pathsPhotos;
  var titles = window.util.titles;


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
        },
        order: i
      };
      adverts.push(oneAdvert);
    }
    return adverts;
  };

  window.data = {
    generateAdvert: generateAdvert
  };
})();
