'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var mapUser = document.querySelector('.map');
  var bigPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var address = document.querySelector('#address');
  var getPinFragment = window.pin.getPinFragment;
  var getCardFragment = window.card.getCardFragment;
  var pinElements = window.pin.pinElements;
  var load = window.backend.load;
  var errorHandler = window.backend.errorHandler;
  var filters = document.querySelector('.map__filters');
  var resetForm = document.querySelector('.ad-form__reset');
  var resetPins = window.pin.resetPins;
  var debounce = window.util.debounce;
  var updatePins = window.filter.updatePins;
  // Активируем карту

  var disabledForm = function () {
    form.classList.add('ad-form--disabled');
    fieldsets.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };

  disabledForm();

  var activateForm = function () {
    form.classList.remove('ad-form--disabled');
    fieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };


  // Соберём все нужные компоненты активации
  var activatePage = function () {
    mapUser.classList.remove('map--faded');
    load(getPinFragment, errorHandler);
    activateForm();
  };

  bigPin.addEventListener('mouseup', function () {
    activatePage();
  });

  // Отрисуем карточки по клику и закрытие

  var openCard = function (advertsArr, index) {
    var cardOneFragment = document.createDocumentFragment();
    cardOneFragment.appendChild(getCardFragment(advertsArr, index));
    mapUser.insertBefore(cardOneFragment, document.querySelector('.map__filters-container'));
  };

  var closeCard = function () {
    var popupClose = document.querySelector('.map__card');
    if (!(popupClose === null)) {
      mapUser.removeChild(popupClose);
    }
  };

  var activatePins = function (arr) {
    var exitPin = pinElements.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < exitPin.length; i++) {
      exitPin[i].addEventListener('click', function (evt) {
        closeCard();
        openCard(arr, evt.currentTarget.dataset.order, errorHandler);
        var popupCloseBtn = document.querySelector('.popup__close');
        popupCloseBtn.addEventListener('click', function () {
          closeCard();
        });
      });
    }
  };


  pinElements.addEventListener('click', function () {
    load(activatePins, errorHandler);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  });

  // Открытие по клавише
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activatePins();
    }
  });


  // Деактивация страницы

  var getResetForm = function () {
    mapUser.classList.add('map--faded');
    form.reset();
    resetPins();
    disabledForm();
    closeCard();
    filters.reset();
  };

  resetForm.addEventListener('click', getResetForm);

  // Фильтр

  var onFilterChange = function (evt) {
    evt.preventDefault();
    closeCard();
    resetPins();
    debounce(updatePins(window.advertsData));
  };

  filters.addEventListener('change', onFilterChange);

  window.map = {
    bigPin: bigPin,
    mapUser: mapUser,
    address: address,
    form: form
  };
})();
