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

  window.data = {
    generateAdvert: function (advertsCount) {
      var adverts = [];

      for (var i = 0; i < advertsCount; i++) {
        var x = window.util.getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X);
        var y = window.util.getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);

        var oneAdvert = {
          author: {
            avatar: window.util.getAvatarUser(i)
          },

          offer: {
            title: window.util.titles[i],
            address: x + ', ' + y,
            price: window.util.getRandomNumber(MIN_PRICE, MAX_PRICE),
            type: window.util.getRandomIndexElement(window.util.types),
            rooms: window.util.getRandomNumber(MIN_ROOMS, MAX_ROOMS),
            checkin: window.util.getRandomIndexElement(window.util.checkinsCheckouts),
            checkout: window.util.getRandomIndexElement(window.util.checkinsCheckouts),
            features: window.util.getRandomLength(window.util.features),
            description: '',
            photos: window.util.pathsPhotos
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
    }
  };
})();
