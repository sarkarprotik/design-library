"use strict";

var flysasLibrary = window.flysasLibrary || {};

flysasLibrary.main = flysasLibrary.main || function (window, document) {
  "use strict";

  var burgerMenu = document.querySelector(".burger");
  var pageNav = document.querySelector("main > nav");
  var accordionButtons = document.querySelectorAll(".accordion button");

  function getParents(elem, className) {
    if (!elem) {
      return;
    }

    if (elem.classList.contains(className)) {
      return elem;
    }

    while (elem.parentElement) {
      elem = elem.parentElement;

      if (elem.classList && elem.classList.contains(className)) {
        return elem;
      }
    }

    return;
  }

  function getItemsHeight(itemsContainer) {
    var itemsContainerLinks = itemsContainer.children;
    var itemsHeight = 0;
    var gutter = 2;

    for (var i = 0; i < itemsContainerLinks.length; i++) {
      itemsHeight += itemsContainerLinks[i].offsetHeight;
    }

    return itemsHeight + gutter;
  }

  function toggleAccordion(elem, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log(elem);
    var accordionContainer = getParents(elem, "accordion");
    if (!accordionContainer) return;
    var itemsContainer = accordionContainer.querySelector(".items");
    accordionContainer.classList.toggle("expanded");

    if (accordionContainer.classList.contains("expanded")) {
      itemsContainer.style.maxHeight = event ? getItemsHeight(itemsContainer) + "px" : "none";

      if (!event) {
        setTimeout(function () {
          itemsContainer.style.maxHeight = getItemsHeight(itemsContainer) + "px";
        }, 500);
      }
    } else {
      itemsContainer.style.maxHeight = "0px";
    }

    return false;
  }

  function toggleNav() {
    this.parentElement.classList.toggle("open");
    pageNav.style.left = this.parentElement.classList.contains("open") ? "0px" : "-90%";
  }

  function bindEvents() {
    burgerMenu.addEventListener("click", toggleNav);

    for (var i = 0; i < accordionButtons.length; i++) {
      var accordionContainer = accordionButtons[i].parentElement;
      var itemsContainer = accordionButtons[i].nextElementSibling;
      itemsContainer.style.maxHeight = "0px";
      accordionContainer.classList.remove("init");
      accordionButtons[i].addEventListener("click", function (event) {
        toggleAccordion(this, event);
      });
    }

    if (location.pathname) {
      var activeLink = document.querySelector("a[href='" + location.pathname + "']");

      if (activeLink) {
        var accordionElem = getParents(activeLink, "flysas-accordion");

        if (accordionElem && accordionElem.toggle) {
          accordionElem.toggle();
        } else if (accordionElem) {
          accordionElem.open = true;
        }
      }
    }

    var iconBtns = document.querySelectorAll(".icon-demo .btn");
    var iconElemRotate = "";
    var iconElemScale = "";

    for (var i = 0; i < iconBtns.length; i++) {
      iconBtns[i].addEventListener("click", function (event) {
        var iconDemoContainer = getParents(this, "icon-demo");
        var iconElem = iconDemoContainer.querySelector(".sas-icon");
        var command = this.innerText;

        if (command === "clear") {
          iconElemRotate = "";
          iconElemScale = "";
          iconElem.style.color = "";
          iconElem.style.transform = "";
        } else if (command === "colorize") {
          iconElem.style.color = iconElem.style.color ? "" : "#006ee6";
        } else {
          if (command.match(/^rotate/gi)) {
            iconElemRotate = iconElemRotate ? "" : command;
          } else if (command.match(/^scale/gi)) {
            iconElemScale = iconElemScale ? "" : command;
          }

          iconElem.style.transform = (iconElemRotate + " " + iconElemScale).trim();
        }
      });
    }

    var btnScaleIcons = document.querySelectorAll(".btn-scale-icons");

    for (var i = 0; i < btnScaleIcons.length; i++) {
      var btnScale = btnScaleIcons[i];
      btnScale.addEventListener("click", function () {
        this.parentElement.nextElementSibling.classList.toggle("scale");
      });
    }
  }

  bindEvents();
}(window, document);