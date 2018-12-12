'use strict';

var ADVERTISING_COUNT = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var LOCATION_MIN_X = 300;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_X = 900;
var LOCATION_MAX_Y = 630;

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var types = ['palace', 'flat', 'house', 'bungalo'];

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var checkinsCheckouts = ['12:00', '13:00', '14:00'];

var pathsPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

//  Генерируем случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

//  Генерируем случайный элемент массива
var getRandomIndexElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Генерируем аватар пользователя

var getAvatarUser = function (indexAvatarImage) {
  var auxiliaryIndex = indexAvatarImage + 1;
  return 'img/avatars/user0' + auxiliaryIndex + '.png';
};

//  Генерируем случайную длинну
var getRandomLength = function (array) {
  return array.slice(getRandomNumber(0, array.length - 1));
};

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


//  Отрисуем метки
var adverts = generateAdvert(ADVERTISING_COUNT);

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
    pinFragment.appendChild(getPin(advertes[i]));
  }
  pinElements.appendChild(pinFragment);
};

// Отрисуем объявления

var getPhotos = function (photosArr) {
  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < photosArr.length; i++) {
    var photosTemplate = document.querySelector('#card')
      .content
      .querySelector('.popup__photos');
    var photosOneElement = photosTemplate.cloneNode(true);
    photosOneElement.querySelector('img').src = photosArr[i];
    photosOneElement.querySelector('img').width = 60;
    photosOneElement.querySelector('img').height = 60;
    photosFragment.appendChild(photosOneElement);
  }
  return photosFragment;
};

var getFeatures = function (featuresArr) {
  var featuresFragment = document.createDocumentFragment();
  for (var i = 0; i < featuresArr.length; i++) {
    var featuresOneElement = document.createElement('li');
    featuresOneElement.className = 'popup__feature popup__feature--' + featuresArr[i];
    featuresFragment.appendChild(featuresOneElement);
  }
  return featuresFragment;
};

var getCard = function (charactersCard, index) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardOneElement = cardTemplate.cloneNode(true);
  cardOneElement.querySelector('.popup__avatar').src = charactersCard[index].author.avatar;
  cardOneElement.querySelector('.popup__title').textContent = charactersCard[index].offer.title;
  cardOneElement.querySelector('.popup__text--address').textContent = charactersCard[index].offer.address;
  cardOneElement.querySelector('.popup__text--price').textContent = charactersCard[index].offer.price + '$  /ночь';
  cardOneElement.querySelector('.popup__type').textContent = charactersCard[index].offer.type;
  cardOneElement.querySelector('.popup__text--capacity').textContent = charactersCard[index].offer.rooms + 'комнаты для ' + charactersCard[index].offer.rooms + 'гостей';
  cardOneElement.querySelector('.popup__text--time').textContent = 'Заезд до ' + charactersCard[index].offer.checkin + ', выезд после ' + charactersCard[index].offer.checkout;
  cardOneElement.querySelector('.popup__features').textContent = '';
  cardOneElement.querySelector('.popup__features').appendChild(getFeatures(charactersCard[index].offer.features));
  cardOneElement.querySelector('.popup__description').textContent = charactersCard[index].offer.description;
  cardOneElement.querySelector('.popup__photos').textContent = '';
  cardOneElement.querySelector('.popup__photos').appendChild(getPhotos(charactersCard[index].offer.photos));
  return cardOneElement;
};

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

var activeForm = function (arr) {
  form.classList.remove('ad-form--disabled');
  fieldsets.forEach(function (item) {
    item.removeAttribute('disabled');
  });
  address.value = arr[2].offer.address;
};


// Соберём все нужные компоненты активации
var activePage = function () {
  mapUser.classList.remove('map--faded');
  getPinFragment(adverts);
  activeForm(adverts);
};

bigPin.addEventListener('mouseup', function () {
  activePage();
});

// Отрисуем карточки по клику и закрытие

var openCard = function (advertsArr, index) {
  var cardOneFragment = document.createDocumentFragment();
  cardOneFragment.appendChild(getCard(advertsArr, index));
  mapUser.insertBefore(cardOneFragment, document.querySelector('.map__filters-container'));
};

var closeCard = function () {
  var popupClose = document.querySelector('.map__card');
  if (!(popupClose === null)) {
    mapUser.removeChild(popupClose);
  }
};

var activeCard = function () {
  var exitPin = pinElements.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < exitPin.length; i++) {
    exitPin[i].addEventListener('click', function (evt) {
      closeCard();
      openCard(adverts, evt.currentTarget.dataset.order);
      var popupCloseBtn = document.querySelector('.popup__close');
      popupCloseBtn.addEventListener('click', function () {
        closeCard();
      });
    });
  }
};

pinElements.addEventListener('click', activeCard);

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
});

// Открытие по клавише
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activeCard();
  }
});


// Валидация формы
var typeHouse = document.querySelector('#type');
var priceHouse = document.querySelector('#price');
var guest = document.querySelector('#capacity');
var options = guest.querySelectorAll('option');
var rooms = document.querySelector('#room_number');

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
