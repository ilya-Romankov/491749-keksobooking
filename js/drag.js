'use strict';

(function () {
  var maxY = 630;
  var minY = 130;
  var maxX = window.map.mapUser.offsetWidth - window.map.bigPin.offsetWidth; // Такое число, чтоб пин не вынести за пределы
  var minX = 0;

  window.map.bigPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

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

      var top = window.map.bigPin.offsetTop - shift.y;
      var left = window.map.bigPin.offsetLeft - shift.x;

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

      window.map.bigPin.style.top = top + 'px';
      window.map.bigPin.style.left = left + 'px';

      window.map.address.value = window.map.bigPin.offsetTop + ',' + window.map.bigPin.offsetLeft;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.map.mapUser.removeEventListener('mousemove', onMouseMove);
      window.map.mapUser.removeEventListener('mouseup', onMouseUp);
    };

    window.map.mapUser.addEventListener('mousemove', onMouseMove);
    window.map.mapUser.addEventListener('mouseup', onMouseUp);
  });
})();
