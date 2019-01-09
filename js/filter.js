'use strict';

(function () {
  var FILTER_PRICE_MIN = 10000;
  var FILTER_PRICE_MAX = 50000;
  var filters = document.querySelector('.map__filters');

  var updatePins = function (adverts) {

    var selectedPins = adverts.slice();

    var select = filters.querySelectorAll('select');
    var features = filters.querySelectorAll('input[type = checkbox]:checked');

    var FilterRules = {
      'housing-type': 'type',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    var filterByValue = function (element, property) {
      return selectedPins.filter(function (newData) {
        return newData.offer[property].toString() === element.value;
      });
    };

    // фильтрация по цене
    var filterByPrice = function (filterPrice) {
      return selectedPins.filter(function (newData) {
        var filterPriceValues = {
          'low': newData.offer.price <= FILTER_PRICE_MIN,
          'middle': newData.offer.price >= FILTER_PRICE_MIN && newData.offer.price <= FILTER_PRICE_MAX,
          'high': newData.offer.price >= FILTER_PRICE_MAX
        };
        return filterPriceValues[filterPrice.value];
      });
    };

    // фильтрация по удобствам
    var filterByFeatures = function (item) {
      return selectedPins.filter(function (newData) {
        return newData.offer.features.indexOf(item.value) >= 0;
      });
    };

    if (select.length !== null) {
      select.forEach(function (item) {
        if (item.value !== 'any') {
          if (item.id !== 'housing-price') {
            selectedPins = filterByValue(item, FilterRules[item.id]);
          } else {
            selectedPins = filterByPrice(item);
          }
        }
      });
    }

    if (features !== null) {
      features.forEach(function (item) {
        selectedPins = filterByFeatures(item);
      });
    }

    if (selectedPins.length) {
      window.pin.getPinFragment(selectedPins);
    }
  };

  window.filter = {
    updatePins: function (adverts) {
      updatePins(adverts);
    }
  };

})();
