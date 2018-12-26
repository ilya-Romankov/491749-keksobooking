'use strict';

(function () {
  var ADVERTISING_COUNT = 8;

  var adverts = window.data.generateAdvert(ADVERTISING_COUNT);

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var pinElements = document.querySelector('.map__pins');

  var getPin = function (charactersPin) {
    var pinOneElement = pinTemplate.cloneNode(true);
    pinOneElement.style = 'left:' + charactersPin.location.x + 'px;' + 'top:' + charactersPin.location.y + 'px;';
    pinOneElement.querySelector('img').src = charactersPin.author.avatar;
    pinOneElement.querySelector('img').alt = charactersPin.offer.title;
    pinOneElement.setAttribute('data-order', charactersPin.order);
    return pinOneElement;
  };
  var getPinFragment = function (advertes) {
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < advertes.length; i++) {
      pinFragment.appendChild(window.pin.getPin(advertes[i]));
    }
    pinElements.appendChild(pinFragment);
  };

  window.pin = {
    getPin: getPin,
    getPinFragment: getPinFragment,
    adverts: adverts,
    pinElements: pinElements
  };
})();
