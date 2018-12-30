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
  var mainForm = document.querySelector('.ad-form');
  var upload = window.backend.upload;
  var mapUser = document.querySelector('.map');

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

  // Отрисовываем сообщение об усрешности

  // Успешный блок
  var closeSucces = function () {
    var success = document.querySelector('.success');
    mapUser.removeChild(success);
  };

  var getSucces = function () {
    var success = document.createDocumentFragment();
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    success.appendChild(successElement);
    mapUser.insertBefore(success, document.querySelector('.map__filters-container'));

    setTimeout(function () {
      closeSucces();
    }, 2500);
  };

  // Неуспешный блок
  var closeError = function () {
    var error = document.querySelector('.error');
    if (!(error === null)) {
      mapUser.removeChild(error);
    }
  };

  var getError = function () {
    var error = document.createDocumentFragment();
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    error.appendChild(errorElement);
    mapUser.insertBefore(error, document.querySelector('.map__filters-container'));

    var closeBtn = document.querySelector('.error__button');
    closeBtn.addEventListener('click', function () {
      closeError();
    });
  };


  // Проверим статус и вызовем один из блоков
  mainForm.addEventListener('submit', function (evt) {
    upload(new FormData(mainForm), function (status) {
      if (status === 200) {
        getSucces();
        mainForm.reset();
      } else {
        getError();
      }
    });
    evt.preventDefault();
  });
})();
