"use strict";

var flysasLibrary = window.flysasLibrary || {};

flysasLibrary.modals = flysasLibrary.modals = function (window, document) {
  "use strict";

  var allModalEnablerElems = document.querySelectorAll("[data-modal]");
  var allModals = document.querySelectorAll(".flysas.modal");

  function loadMarkup(props, cb) {
    var method = props.data ? "POST" : "GET";
    var url = !props.url.match(/^http/gi) ? hostname + props.url : props.url;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        cb(xhttp.responseText);
      } else if (this.readyState == 4 && this.status != 200) {
        cb("");
      }
    };

    xhttp.open(method, url, true);
    xhttp.send();
  }

  function modal(modalContainer) {
    var elemContent = modalContainer.querySelector(".modal-content");
    var btnClose = modalContainer.querySelectorAll("[data-close=true]");
    var openOnload = modalContainer.getAttribute("data-onload") === "open";
    var focusableElements = Array.prototype.slice.call(elemContent.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])"));
    var firstFocusableElem = focusableElements[0];
    var lastFocusableElem = focusableElements[focusableElements.length - 1];
    var KEY_ESC = 27;
    var KEY_TAB = 9;
    var modalEnablerElem;
    var dynamicHtml;

    function focusFirst() {
      if (!focusableElements[0]) {
        return;
      }

      focusableElements[0].focus();
    }

    modalContainer.open = function (elem) {
      var href = elem.href;

      if (href && !dynamicHtml) {
        loadMarkup({
          url: href + ".content.html"
        }, function (html) {
          dynamicHtml = html;
          modalContainer.querySelector(".dynamic-content").innerHTML = dynamicHtml;
        });
      }

      modalEnablerElem = elem;
      modalContainer.addEventListener("click", function (event) {
        event.stopPropagation();
        close();
      });
      modalContainer.classList.add("open");
      document.body.classList.add("locked");
      focusFirst();

      if (modalContainer.querySelector(".flysas-accordion") && flysasLibrary.accordions) {
        flysasLibrary.accordions.init(modalContainer.querySelectorAll(".flysas-accordion"));
      }
    };

    function close(event) {
      modalContainer.classList.remove("open");
      document.body.classList.remove("locked");
      modalEnablerElem.focus();
    }

    function handleKeyDown(event) {
      switch (event.keyCode) {
        case KEY_ESC:
          close();
          break;

        case KEY_TAB:
          if (focusableElements.length <= 1) {
            event.preventDefault();
            break;
          }

          if (document.activeElement === firstFocusableElem && event.shiftKey) {
            event.preventDefault();
            lastFocusableElem.focus();
          } else if (document.activeElement === lastFocusableElem && !event.shiftKey) {
            event.preventDefault();
            firstFocusableElem.focus();
          }

          break;

        default:
          break;
      }
    }

    elemContent.addEventListener("click", function (event) {
      event.stopPropagation();
    });
    elemContent.addEventListener("keydown", handleKeyDown);

    for (var i = 0; i < btnClose.length; i++) {
      btnClose[i].addEventListener("click", close);
    }

    if (openOnload) {
      open();
    }
  }

  function init() {
    allModalEnablerElems = document.querySelectorAll("[data-modal]");
    allModals = document.querySelectorAll(".flysas.modal");

    for (var i = 0; i < allModals.length; i++) {
      if (allModals[i].initiated) {
        continue;
      }

      allModals[i].initiated = true;
      new modal(allModals[i]);
    }

    for (var i = 0; i < allModalEnablerElems.length; i++) {
      var modalEnablerElem = allModalEnablerElems[i];

      if (modalEnablerElem.initiated) {
        continue;
      }

      modalEnablerElem.initiated = true;
      modalEnablerElem.addEventListener("click", function (event) {
        event.preventDefault();
        var modalContainer = document.getElementById(this.getAttribute("data-modal"));

        if (!modalContainer) {
          return;
        }

        modalContainer.open(this);
      });
    }
  }

  init();
  window.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", init);
  return {
    init: init
  };
}(window, document);