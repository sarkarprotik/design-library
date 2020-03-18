"use strict";

window.flysasLibrary = window.flysasLibrary || {};

flysasLibrary.sasSpinNumber = function (window, document) {
  "use strict";

  var spinningNumbersElem = document.querySelector(".spinning-numbers");

  if (!spinningNumbersElem) {
    return;
  }

  var startDigits = spinningNumbersElem.getAttribute("data-digits");
  var numberOfDigits = startDigits.length || 5;
  var firstNumberElem = document.createElement("div");
  var elemHTML = spinningNumbersElem.firstElementChild.outerHTML;
  spinningNumbersElem.innerHTML = "";

  for (var i = 0; i < numberOfDigits; i++) {
    firstNumberElem.innerHTML = elemHTML;
    var numberElem = firstNumberElem.firstElementChild;
    spinningNumbersElem.appendChild(numberElem);
    var digit = +startDigits[i] || 10;
    numberElem.querySelector(".numbers").style.top = "-" + (digit - 1) + "em";
  }

  var allNumberElems = spinningNumbersElem.querySelectorAll(".numbers");

  var spin = function spin(digits) {
    if (!digits) {
      var multiplier = "10000000000".substring(0, allNumberElems.length);
      digits = Math.floor(Math.random() * +multiplier);
    }

    digits = "0000000000" + digits;
    digits = digits.substring(digits.length - allNumberElems.length);

    for (var _i = 0; _i < allNumberElems.length; _i++) {
      var topPos = +digits[_i] || 10;
      allNumberElems[_i].style.top = "-" + (topPos - 1) + "em";
    }
  };

  return {
    spin: spin
  };
}(window, document);