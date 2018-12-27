'use strict';

(function () {
  var mainTitle = document.querySelector('#title');
  var priceHouseIn = document.querySelector('#price');
  var typeHouse = document.querySelector('#type');
  var guest = document.querySelector('#capacity');
  var options = guest.querySelectorAll('option');
  var rooms = document.querySelector('#room_number');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var submitForm = document.querySelector('.ad-form__submit');
  var checkValidInputs = [mainTitle, priceHouseIn];

  var typesHouses = {
    'bungalo': {
      MIN_VALUE: '0',
      PLACEHOLDER: '0',
    },
    'flat': {
      MIN_VALUE: '1000',
      PLACEHOLDER: '1000',
    },
    'house': {
      MIN_VALUE: '5000',
      PLACEHOLDER: '5000',
    },
    'palace': {
      MIN_VALUE: '10000',
      PLACEHOLDER: '10000'
    }
  };

  var roomsMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  // Устанавливаем зависимость квартира - цена
  var getMinPrice = function () {
    var priceHouse = document.querySelector('#price');
    priceHouse.min = typesHouses[typeHouse.value].MIN_VALUE;
    priceHouse.placeholder = typesHouses[typeHouse.value].PLACEHOLDER;
  };

  typeHouse.addEventListener('input', getMinPrice);

  // Устанавливаем зависимость гость - комната

  var getRooms = function () {
    options.forEach(function (option) {
      option.disabled = !roomsMap[rooms.value].includes(option.value);
    });
    guest.value = roomsMap[rooms.value].includes(guest.value) ? guest.value : roomsMap[rooms.value][0];
  };

  rooms.addEventListener('input', getRooms);

  // Установим зависимость заезд - выезд
  var getTimesIn = function () {
    if (timeOut.value !== timeIn.value) {
      timeOut.value = timeIn.value;
    }
  };

  var getTimesOut = function () {
    if (timeIn.value !== timeOut.value) {
      timeIn.value = timeOut.value;
    }
  };

  timeIn.addEventListener('input', getTimesIn);
  timeOut.addEventListener('input', getTimesOut);

  var checkedInput = function () {
    for (var i = 0; i < checkValidInputs.length; i++) {
      var valid = checkValidInputs[i].validity.valid;
      if (!valid) {
        checkValidInputs[i].classList.add('invalid');
        checkValidInputs[i].style.border = '1px solid red';
      } else {
        checkValidInputs[i].classList.remove('invalid');
        checkValidInputs[i].style.border = '1px solid #d9d9d3';
      }
    }
  };

  submitForm.addEventListener('click', function () {
    checkedInput();
  });
})();
