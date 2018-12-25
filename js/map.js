'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var mapUser = document.querySelector('.map');
  var bigPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var address = document.querySelector('#address');

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
    window.pin.getPinFragment(window.pin.adverts);
    activateForm();
  };

  bigPin.addEventListener('mouseup', function () {
    activatePage();
  });

  // Отрисуем карточки по клику и закрытие

  var openCard = function (advertsArr, index) {
    var cardOneFragment = document.createDocumentFragment();
    cardOneFragment.appendChild(window.card.getCardFragment(advertsArr, index));
    mapUser.insertBefore(cardOneFragment, document.querySelector('.map__filters-container'));
  };

  var closeCard = function () {
    var popupClose = document.querySelector('.map__card');
    if (!(popupClose === null)) {
      mapUser.removeChild(popupClose);
    }
  };

  var activatePins = function () {
    var exitPin = window.pin.pinElements.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < exitPin.length; i++) {
      exitPin[i].addEventListener('click', function (evt) {
        closeCard();
        openCard(window.pin.adverts, evt.currentTarget.dataset.order);
        var popupCloseBtn = document.querySelector('.popup__close');
        popupCloseBtn.addEventListener('click', function () {
          closeCard();
        });
      });
    }
  };

  window.pin.pinElements.addEventListener('click', activatePins);

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
  window.map = {
    bigPin: bigPin,
    mapUser: mapUser,
    address: address
  };
})();
