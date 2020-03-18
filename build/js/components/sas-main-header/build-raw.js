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

var flysasLibrary = window.flysasLibrary || {};

flysasLibrary.mainCookiebar = function (window, document) {
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
}(window, document);

window.flysasLibrary = window.flysasLibrary || {};

flysasLibrary.sasMainMenu = function (window, document) {
  "use strict";

  var mainMenuElem = document.querySelector('.sas-main-menu');

  if (!mainMenuElem) {
    return;
  }

  new MainMenu();

  function MainMenu() {
    var isMobile = window.innerWidth <= 991;
    var categories = [];
    var mainBody = document.body;
    var mainMenuTrigger = mainMenuElem.querySelector(".hamburger-toggle");
    var mainMenuList = mainMenuElem.querySelector("ul");
    var mainMenuListItems = Array.from(mainMenuList.children);
    var mainHeader = document.querySelector('.sas-main-header');

    if (isMobile) {
      mainMenuTrigger.addEventListener("click", slide);
      mainMenuList.setAttribute("aria-hidden", "true");
      mainMenuList.addEventListener('transitionend', function () {
        mainMenuList.style.height = "auto";
      });
    }

    function slide(event) {
      event.preventDefault();
      mainHeader.classList.toggle("menu-expanded");
      mainMenuList.classList.toggle("expanded");
      mainMenuTrigger.classList.toggle("expanded");
      mainBody.classList.toggle("menu-is-active");

      if (mainMenuTrigger.classList.contains("expanded")) {
        mainMenuTrigger.setAttribute("aria-expanded", "true");
        mainMenuList.setAttribute("aria-hidden", "false");
      } else {
        mainMenuTrigger.setAttribute("aria-expanded", "false");
        mainMenuList.setAttribute("aria-hidden", "true");
      }
    }

    mainMenuListItems.forEach(function (item) {
      categories.push(new NavCategory(item));
    });

    function NavCategory(categoryElem) {
      var categoryChildList = categoryElem.querySelector("ul");

      if (!categoryChildList) {
        return;
      }

      var expandTrigger = categoryElem.querySelector("a");
      var collapsedHeight = expandTrigger.clientHeight;
      var expandedHeight = categoryElem.clientHeight; //const mobileTop = mainMenuList.offsetTop

      if (expandTrigger.classList.contains("active")) {
        categoryElem.style.height = expandedHeight + "px";
      } else {
        categoryElem.style.height = collapsedHeight + "px";
      }

      expandTrigger.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var isOpen = expandTrigger.classList.contains("expanded");

        if (!isMobile) {
          hideAll();

          if (!isOpen) {
            toggle(true);
          }
        } else {
          toggle(!isOpen);
        }
      });
      mainHeader.addEventListener("click", function (event) {
        if (!isMobile) {
          hideAll();
        }
      });

      function toggle(value) {
        expandTrigger.setAttribute("aria-expanded", value.toString());

        if (value) {
          expandTrigger.classList.add("expanded");
          categoryChildList.classList.add("expanded");
          mainHeader.classList.add("expanded");
        } else {
          expandTrigger.classList.remove("expanded");
          categoryChildList.classList.remove("expanded");
          mainHeader.classList.remove("expanded");
        }

        categoryElem.style.height = (value ? expandedHeight : collapsedHeight) + "px";
      }

      return {
        toggle: toggle
      };
    }

    function hideAll() {
      categories.forEach(function (category) {
        if (category.toggle) {
          category.toggle(false);
        }
      });
    }
  }
}(window, document);

var flysasLibrary = window.flysasLibrary || {};

flysasLibrary.sasSearch = flysasLibrary.sasSearch || function (window, document) {
  "use strict";

  var searchModule = document.querySelector(".sas-search");

  function load() {
    var searchField = searchModule.querySelector(".col-form-field");
    var searchButton = searchModule.querySelector(".search-submit");
    var searchInput = searchModule.querySelector("input");
    var searchClose = searchModule.querySelector(".close-button");
    searchButton.addEventListener("click", function (event) {
      if (!searchButton.classList.contains("open")) {
        event.preventDefault();
        searchField.classList.add("open");
        searchButton.classList.add("open");
        searchInput.focus();
      }

      searchClose.addEventListener("click", function (event) {
        event.preventDefault();
        searchField.classList.remove("open");
        searchButton.classList.remove("open");
      });
    });
  }

  if (searchModule) {
    load();
  }

  return {
    load: load
  };
}(window, document);

window.flysasLibrary = window.flysasLibrary || {};

flysasLibrary.sasUser = flysasLibrary.sasUser || function (window, document) {
  "use strict";

  if (!window.sessionStorage) {
    return;
  }

  var hasUserCookie = document.cookie.match(/NEW_SAS_SSO_LOGGEDIN=.+/gi);
  var loginElem = document.querySelector(".sas-main-header .btn-login");
  var userElem = document.querySelector(".sas-main-header .user");
  var basicProfile = JSON.parse(window.sessionStorage.getItem("basicProfile") || "{}");
  var customer;

  if (!loginElem || !userElem) {
    return;
  } else if (!hasUserCookie || !basicProfile.customerSessionId) {
    window.sessionStorage.removeItem("basicProfile");
    userElem.style.display = "none";
    loginElem.style.display = "flex";
  }

  function loadJs(path, async, cb) {
    var jsEl = document.createElement("script");
    jsEl.src = path;
    jsEl.async = async;
    jsEl.onload = cb;
    document.head.insertBefore(jsEl, document.head.childNodes[document.head.childNodes.length - 1].nextSibling);
  }

  function setProfileData() {
    if (basicProfile.eb) {
      userElem.querySelector(".initials").classList.add("profile-" + basicProfile.currentTierCode.toLowerCase());
      userElem.querySelector(".points > span").innerText = basicProfile.formattedPoints;
    }
  }

  function setInitials() {
    userElem.querySelector(".initials").innerText = basicProfile.firstName[0] + basicProfile.lastName[0];
  }

  function bindEvents() {
    loginElem.addEventListener("click", showCustomerModal);
  }

  function displayModal() {
    customer = new Customer("#customer", customerConfig);
    customer.show();
  }

  function showCustomerModal() {
    if (customer && customer.show) {
      displayModal();
      return;
    }

    loadJs("/v2/de-design-library/assets/js/customer.js", true, displayModal);
  }

  bindEvents();

  if (hasUserCookie && basicProfile.customerSessionId) {
    setProfileData();
    setInitials();
    loginElem.style.display = "none";
    userElem.style.display = "flex";
  }
}(window, document);