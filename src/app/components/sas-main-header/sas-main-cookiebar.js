var flysasLibrary = window.flysasLibrary || {};
flysasLibrary.mainCookiebar = (function(window, document) {
  "use strict";

  var cookieNew = "_cookienew";
  var cookiePersonalization = "_cookiepersonalization";
  var cookieBar = document.querySelector(".sas-main-cookiebar");
  var hasCookieAcknowledged = document.cookie.match(/(^|;\s)_cookienew=acknowledged(;|$)/gi);

  if (!cookieBar) {
    return;
  }

  if (!hasCookieAcknowledged) {
    cookieBar.style.display = "block";
  }

  function setCookie(name, value) {
    var flysasCookie = name + "=" + escape(value);

    var expiresInDays = 365;
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + expiresInDays);

    flysasCookie += "; expires=" + expireDate.toUTCString();
    flysasCookie += "; domain=" + location.hostname;
    flysasCookie += "; path=/";

    document.cookie = flysasCookie;
  }

  function bindEvents() {
    var approveBtns = document.querySelectorAll(".btn-acknowledge");
    for (var i = 0; i < approveBtns.length; i++) {
      approveBtns[i].addEventListener("click", setAcknowledgeCookies);
    }
  }

  function setAcknowledgeCookies(event) {
    var approvePersonalization = document.getElementById("cookie-personalization").checked;
    setCookie(cookieNew, "acknowledged");
    setCookie(cookiePersonalization, approvePersonalization.toString());
    cookieBar.style.display = "none";
  }

  bindEvents();
})(window, document);

