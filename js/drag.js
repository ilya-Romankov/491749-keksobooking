'use strict';

(function () {
  var maxY = 630;
  var minY = 130;
  var maxX = window.map.mapUser.offsetWidth - window.map.bigPin.offsetWidth; // Такое число, чтоб пин не вынести за пределы
  var minX = 0;
  var bigPin = window.map.bigPin;
  var address = window.map.address;
  var mapUser = window.map.mapUser;

  bigPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    address.value = bigPin.offsetTop + ',' + bigPin.offsetLeft;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var top = bigPin.offsetTop - shift.y;
      var left = bigPin.offsetLeft - shift.x;

      if (top >= maxY) {
        top = maxY;
      } else if (top <= minY) {
        top = minY;
      }

      if (left >= maxX) {
        left = maxX;
      } else if (left <= minX) {
        left = minX;
      }


      bigPin.style.top = top + 'px';
      bigPin.style.left = left + 'px';

      address.value = bigPin.offsetTop + ',' + bigPin.offsetLeft;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      mapUser.removeEventListener('mousemove', onMouseMove);
      mapUser.removeEventListener('mouseup', onMouseUp);
    };

    mapUser.addEventListener('mousemove', onMouseMove);
    mapUser.addEventListener('mouseup', onMouseUp);
  });
})();
