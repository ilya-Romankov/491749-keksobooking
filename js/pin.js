'use strict';

(function () {
  var ADVERTISING_COUNT = 8;
  var adverts = window.data.generateAdvert(ADVERTISING_COUNT);
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElements = document.querySelector('.map__pins');

  var getPin = function (charactersPin, index) {
    var pinOneElement = pinTemplate.cloneNode(true);
    pinOneElement.style = 'left:' + charactersPin.location.x + 'px;' + 'top:' + charactersPin.location.y + 'px;';
    pinOneElement.querySelector('img').src = charactersPin.author.avatar;
    pinOneElement.querySelector('img').alt = charactersPin.offer.title;
    pinOneElement.setAttribute('data-order', index);
    return pinOneElement;
  };
  var getPinFragment = function (advertes) {
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < advertes.length; i++) {
      pinFragment.appendChild(getPin(advertes[i], i));
    }
    pinElements.appendChild(pinFragment);
  };


  var resetPins = function () {
    var existingPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < existingPinElements.length; i++) {
      pinElements.removeChild(existingPinElements[i]);
    }
  };

  window.pin = {
    getPin: getPin,
    getPinFragment: getPinFragment,
    adverts: adverts,
    pinElements: pinElements,
    resetPins: resetPins,
  };
})();
