var flysasLibrary = window.flysasLibrary || {};
flysasLibrary.cookies = flysasLibrary.cookies || (function(window, document, location, market) {
  "use strict";

  var isDebugMode = false;

  function getCookie(name) {
    var allCookies = document.cookie.split(";");
    for (var i = 0; i < allCookies.length; i++) {
      var current = allCookies[i].split("=");
      if (current[0].trim() === name) {
        return unescape(current[1].trim());
      }
    }
  }

  function setCookie(name, value) {
    var flysasCookie = name + "=" + escape(value);

    var expiresInDays = (365 * 2);
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + expiresInDays);

    flysasCookie += "; expires=" + expireDate.toUTCString();
    flysasCookie += "; domain=" + location.hostname;
    flysasCookie += "; path=/";

    if (isDebugMode) {
      console.log(flysasCookie);
    } else {
      document.cookie = flysasCookie;
    }
  }

  function init(props) {
    isDebugMode = (props && props.debug === true);

    var flysasMarket = market.getCountryAndLanguage();
    setCookie("_country", flysasMarket.country);
    setCookie("_language", flysasMarket.language);
  }
  init({ debug: false });

  return {
    init: init
  }
})(window, document, window.location, flysasLibrary.market);
