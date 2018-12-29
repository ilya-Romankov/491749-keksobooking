'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var dataPath = '/data';

  // Проработка ошибок
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 100000;
    return xhr;
  };


  var errorHandler = function (errorMessage) {
    var node = document.createElement('p');
    node.style = 'z-index: 100; margin: 5px auto; text-align: center; background-color: red; border: 2px solid black';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Загружаем
  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', URL + dataPath);
    xhr.send();
  };

  // Отгружаем
  var upLoad = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  // Сообщение об ошибке


  window.backend = {
    errorHandler: errorHandler,
    load: load,
    upLoad: upLoad
  };
})();
