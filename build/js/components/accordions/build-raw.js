"use strict";

window.flysasLibrary = window.flysasLibrary || {};

flysasLibrary.accordions = flysasLibrary.accordions || function (window, document) {
  "use strict"; //let accordionElems = document.querySelectorAll(".flysas-accordion")

  function accordion(elem) {
    var btnElem = elem.querySelector(".btn-toggle");
    var contentElem = elem.querySelector(".accordion-content");
    var isOpen = elem.open === true || elem.getAttribute("data-expanded") === "true";

    if (!btnElem || !contentElem) {
      elem.style.display = "none";
      return;
    }

    elem.toggle = function () {
      var isExpanded = btnElem.getAttribute("aria-expanded") === "true";
      elem.style.height = (isExpanded ? btnHeight : btnHeight + contentHeight + 2) + "px";
      btnElem.setAttribute("aria-expanded", !isExpanded);

      if (isExpanded) {
        setTimeout(function () {
          contentElem.classList.add("hidden");
        }, 550);
      } else {
        contentElem.classList.remove("hidden");
      }
    };

    var iconElem = document.createElement("i");
    iconElem.className = "accordion-arrow";
    btnElem.appendChild(iconElem);
    var btnHeight = btnElem.clientHeight + 8;
    var contentHeight = contentElem.clientHeight;
    elem.style.height = btnHeight + "px";
    contentElem.classList.add("hidden"); //contentElem.style.maxWidth = btnElem.clientWidth + "px"

    var discardClick = false;
    btnElem.addEventListener("click", function (event) {
      event.preventDefault();

      if (discardClick) {
        return;
      }

      discardClick = true;
      elem.toggle();
      setTimeout(function () {
        discardClick = false;
      }, 500);
    });

    if (isOpen) {
      elem.toggle();
    }

    elem.style.opacity = 1;
  }

  function init(accordionElems) {
    accordionElems = accordionElems || document.querySelectorAll(".flysas-accordion");

    for (var i = 0; i < accordionElems.length; i++) {
      var btnElem = accordionElems[i].querySelector(".btn-toggle");
      var isValid = btnElem.clientHeight > 0;

      if (accordionElems[i].initiated || !isValid) {
        continue;
      }

      accordionElems[i].initiated = true;
      new accordion(accordionElems[i]);
    }
  }

  init();
  window.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", init);
  return {
    init: init
  };
}(window, document);