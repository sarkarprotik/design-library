"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var flysasEvents = window.flysasEvents || function () {
  var topics = {};
  var hOP = topics.hasOwnProperty;
  return {
    subscribe: function subscribe(topic, listener) {
      // Create the topic's object if not yet created
      if (!hOP.call(topics, topic)) topics[topic] = []; // Add the listener to queue

      var index = topics[topic].push(listener) - 1; // Provide handle back for removal of topic

      return {
        remove: function remove() {
          delete topics[topic][index];
        }
      };
    },
    publish: function publish(topic, info) {
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if (!hOP.call(topics, topic)) return; // Cycle through topics queue, fire!

      topics[topic].forEach(function (item) {
        item(info != undefined ? info : {});
      });
    }
  };
}();

var flysasLibrary = window.flysasLibrary || {};

flysasLibrary.market = flysasLibrary.market || function (window, document, location) {
  "use strict";

  var regexForceEn = ["\/onboard"];
  var isForcedEn = false;
  var defaultCountry = "lu";
  var defaultLanguage = "en";
  var forcedEnCountry = "se";
  var forcedEnLanguage = "en";
  var country;
  var language;
  var sasHostnameMarkets = {
    se: "sv",
    no: "no",
    dk: "da",
    fi: "en"
  };
  var sasHostname = location.hostname.match(/^.+\.sas\.(se|no|dk|fi)/gi);
  var flysasHostname = location.hostname.match(/^.+\.flysas\.com/gi);
  var pathnameMarket = location.pathname.match(/^\/[a-z]{2}-[a-z]{2}(\/|$)/g);
  var isPathnameEn = location.pathname.match(/^\/en(\/|$)/g) ? true : false;

  for (var i = 0; i < regexForceEn.length; i++) {
    isForcedEn = isForcedEn || new RegExp(regexForceEn[i], "i").test(location.pathname);
  }

  function assignFromDefaults() {
    country = defaultCountry;
    language = defaultLanguage;
  }

  function assignFromSasHostname() {
    country = sasHostname[0].replace(/.+\.sas\./gi, "");
    language = sasHostnameMarkets[country];

    if (isPathnameEn) {
      language = "en";
    }
  }

  function assignFromPathname() {
    var flysasMarket = pathnameMarket[0].split("-");
    country = (flysasMarket[0] || "").replace("/", "");
    language = (flysasMarket[1] || "").replace("/", "");
  }

  function getCountryAndLanguage() {
    if (sasHostname) {
      assignFromSasHostname();
    } else if (flysasHostname && isPathnameEn || !pathnameMarket) {
      assignFromDefaults();
    } else if (pathnameMarket) {
      assignFromPathname();
    }

    if (isForcedEn) {
      return {
        country: forcedEnCountry,
        language: forcedEnLanguage
      };
    }

    return {
      country: country || defaultCountry,
      language: language || defaultLanguage
    };
  }

  window.flysasMarket = getCountryAndLanguage();
  return {
    getCountryAndLanguage: getCountryAndLanguage
  };
}(window, document, window.location);

var flysasLibrary = window.flysasLibrary || {};

flysasLibrary.config = flysasLibrary.config || function (window, document, market) {
  var localHostname = "";
  var prodHostname = "https://www.flysas.com";
  var isV2Hostname = !!window.location.hostname.match(/^(www|test)\.(fly)?sas\..+/gi);
  var isLocalEnv = !!(window.location.hostname.match(/^(local|192).+/gi) && window.location.port === "3000" || window.location.hostname.match(/^(de-design-library).+/gi));
  var appHostname = !isV2Hostname && !isLocalEnv ? prodHostname : localHostname;
  var market = market.getCountryAndLanguage();
  return {
    appHostname: appHostname,
    hostname: localHostname,
    market: market
  };
}(window, document, flysasLibrary.market);

document.addEventListener("touchmove", function (e) {
  e.preventDefault();
});
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

window.flysasLibrary = window.flysasLibrary || {};

flysasLibrary.tabs = flysasLibrary.tabs || function (window, document) {
  "use strict";

  var tabContainers = document.querySelectorAll(".tabs");

  function tabContainer(elemContainer) {
    var tabList = elemContainer.querySelector(".tablist");
    var tabListBtns = tabList ? tabList.children : [];
    var tabListPanels = elemContainer.querySelectorAll(".tabpanel");

    function resetAllBtns() {
      Array.from(tabListBtns).forEach(function (item) {
        item.setAttribute("aria-selected", "false");
      });
    }

    function resetAllPanels() {
      Array.from(tabListPanels).forEach(function (item) {
        item.setAttribute("hidden", "");
      });
    }

    function switchTab(event) {
      resetAllBtns();
      resetAllPanels();
      this.setAttribute("aria-selected", "true");
      document.getElementById(this.getAttribute("aria-controls")).removeAttribute("hidden");
    }

    Array.from(tabListBtns).forEach(function (item) {
      item.addEventListener("click", switchTab);
    });
  }

  Array.from(tabContainers).forEach(function (item) {
    new tabContainer(item);
  });
}(window, document);

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

var flysasLibrary = window.flysasLibrary || {};

flysasLibrary.anchorlinks = flysasLibrary.anchorlinks || function (window, document, location) {
  "use strict";

  var anchorlinks = document.querySelectorAll('a[href^="#"]');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var item = _step.value;
      item.addEventListener('click', function (e) {
        var hashval = item.getAttribute('href');
        var target = document.querySelector(hashval);
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        history.pushState(null, null, hashval);
        e.preventDefault();
      });
    };

    for (var _iterator = anchorlinks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}(window, document, window.location);

window.flysasLibrary = window.flysasLibrary || {};

flysasLibrary.forms = flysasLibrary.forms || function (window, document) {
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

  function flysasForm(formElem, callback) {
    var isInitialized;

    function listBox(comboBoxElem) {
      var inputElem = comboBoxElem.querySelector("input");
      var listBoxElem = comboBoxElem.querySelector(".input-listbox");
      var formFieldCol = getParents(inputElem, "col-form-field");
      var sasInput = getParents(inputElem, "sas-input");
      var listBoxSrc = listBoxElem.getAttribute("data-items-source");
      var listBoxData = listBoxSrc && flysasLibrary.pageData ? flysasLibrary.pageData[listBoxSrc] || [] : [];
      var listBoxPreselect = listBoxElem.getAttribute("data-preselect");
      var listItemElems;
      var searchValue;
      var selectedItem;
      var itemIndex = 0;
      var selectedClassName = "chosen";
      comboBoxElem.setAttribute("aria-expanded", false);

      function selectFilterItem() {
        itemIndex = 0;
        var dataItem = (selectedItem || {}).dataItem;

        if (dataItem) {
          inputElem.value = dataItem.value2 || dataItem.value1;
          inputElem.setAttribute("aria-activedescendant", "");

          if (callback) {
            callback(inputElem, dataItem);
          }

          if (sasInput) {
            sasInput.classList.add("focused");
          }
        } else if (sasInput) {
          sasInput.classList.remove("focused");
        }

        toggleFilter(false);
      }

      function stepInFilter() {
        if (!listItemElems || listItemElems.length === 0) {
          itemIndex = 0;
          inputElem.setAttribute("aria-activedescendant", "");
          return;
        }

        if (itemIndex < 0) {
          itemIndex = listItemElems.length - 1;
        } else if (itemIndex >= listItemElems.length) {
          itemIndex = 0;
        }

        for (var i = 0; i < listItemElems.length; i++) {
          listItemElems[i].classList.remove(selectedClassName);
        }

        if (itemIndex > -1) {
          listItemElems[itemIndex].classList.add(selectedClassName);
          inputElem.setAttribute("aria-activedescendant", listItemElems[itemIndex].id);
          selectedItem = listItemElems[itemIndex];
        }
      }

      function clearFilter() {
        while (listBoxElem.hasChildNodes()) {
          listBoxElem.removeChild(listBoxElem.lastChild);
        }

        listItemElems = undefined;
        toggleFilter(false);
      }

      function toggleFilter(isVisible) {
        comboBoxElem.setAttribute("aria-expanded", isVisible);
      }

      function filterData(event) {
        if (listBoxElem && listBoxElem.scrollTo) {
          listBoxElem.scrollTo(0, 0);
        }

        if (event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 91) {
          return true;
        } else if (event.keyCode === 40) {
          itemIndex++;
          stepInFilter();
        } else if (event.keyCode === 38) {
          itemIndex--;
          stepInFilter();
        } else if (event.keyCode === 10 || event.keyCode === 13 || event.keyCode === 9) {
          selectFilterItem();
          inputElem.blur();
          clearTimeout(blurTimer);
          return false;
        } else {
          searchValue = inputElem.value.trim();
          clearFilter();
          var hits = [];

          for (var i = 0; i < listBoxData.length; i++) {
            var item = listBoxData[i];

            if (item.value1 && new RegExp(searchValue, "gi").test(item.value1)) {
              hits.push(item);
            } else if (item.value2 && new RegExp(searchValue, "gi").test(item.value2)) {
              hits.push(item);
            }
          }

          for (var i = 0; i < hits.length; i++) {
            var item = hits[i];
            var li = document.createElement("li");
            li.id = listBoxElem.id + "-item-" + i;
            li.className = "city-listbox-item" + (i === 0 ? " " + selectedClassName : "");

            if (item.value1 && item.value1 !== item.value2) {
              var span1 = document.createElement("span");
              span1.className = "value-1";
              span1.insertAdjacentHTML("beforeend", item.value1);
              li.appendChild(span1);
            }

            if (item.value2) {
              var span2 = document.createElement("span");
              span2.className = "value-2";
              span2.insertAdjacentHTML("beforeend", item.value2);
              li.appendChild(span2);
            }

            li.dataItem = item;
            listBoxElem.appendChild(li);
          }

          listItemElems = listBoxElem.querySelectorAll("li");
          toggleFilter(hits.length > 0);

          if (hits.length > 0 && searchValue) {
            selectedItem = listItemElems[0];
          }
        }
      }

      inputElem.addEventListener("keydown", function (event) {
        if (event.keyCode === 10 || event.keyCode === 13) {
          event.preventDefault();
        }

        return true;
      });
      inputElem.addEventListener("keyup", function (event) {
        if (event.keyCode !== 9) {
          filterData(event);
        }
      });
      var blurTimer = null;
      inputElem.addEventListener("blur", function (event) {
        blurTimer = setTimeout(function () {
          selectFilterItem();
        }, 250);
      });
      inputElem.addEventListener("focus", function (event) {
        if (this.getAttribute("readonly") === "") {
          return;
        }

        this.value = "";
        filterData({
          keyCode: 0
        });
      });
      listBoxElem.addEventListener("click", function (event) {
        clearTimeout(blurTimer);
        selectedItem = getParents(event.target, "city-listbox-item");
        selectFilterItem();
      });

      if (listBoxData) {
        if (listBoxPreselect) {
          for (var i = 0; i < listBoxData.length; i++) {
            var item = listBoxData[i];
            var itemText = item.value2 || item.value1 || "";
            var itemCode = item.value3 || "";

            if (itemText.replace(/\s/gi, "").toLowerCase() === listBoxPreselect.toLowerCase() || itemCode.toLowerCase() === listBoxPreselect.toLowerCase()) {
              selectedItem = {
                dataItem: item
              };
              break;
            }
          }
        }

        if (!selectedItem) {
          selectedItem = {
            dataItem: listBoxData[0]
          };
        }

        selectFilterItem();
      }

      return {
        filterData: filterData
      };
    }

    function init() {
      if (!formElem || isInitialized) {
        return;
      }

      callback = formElem.callback || callback;
      var activeTimer;

      function setActive(isActive) {
        clearTimeout(activeTimer);
        activeTimer = setTimeout(function () {
          formElem.classList.toggle("active", isActive);
          activeTimer = null;
        }, 100);
      }

      function setFocused(formFieldCol, isFocused) {
        var formFieldElem = formFieldCol.querySelector("label");
        formFieldCol.classList.toggle("focused", isFocused);
        setActive(isFocused);
      }

      var inputs = formElem.querySelectorAll(".col-form-field input, .col-form-field select, .sas-input input, .sas-input select, .sas-input textarea");

      function validate(event) {
        this.value = this.value.trim();
        var value = this.value || "";
        var validationRegExp = this.getAttribute("data-validation");
        var sasInput = getParents(this, "sas-input");
        var messageElem = sasInput.querySelector(".message");
        var hasInvalidValue = validationRegExp && !new RegExp(validationRegExp, "gi").test(value);
        var hasMessage = value === "" && messageElem && messageElem.innerText !== "";

        if (!hasMessage && validationRegExp) {
          hasMessage = validationRegExp && hasInvalidValue;
        }

        if (this.listBox) {
          setActive(false);
          return;
        }

        if (value === "" && !isReadonly) {
          setFocused(sasInput, false);
        } else {
          setActive(false);
        }

        if (hasMessage) {
          sasInput.classList.add("invalid");
          return false;
        }

        return true;
      }

      for (var i = 0; i < inputs.length; i++) {
        var inputBehavior = inputs[i].getAttribute("data-behavior");
        var inputElem = inputs[i];
        var containerElem = getParents(inputElem, "form-field");
        var isComboboxElem = containerElem && containerElem.classList.contains("form-combobox");
        var isReadonly = inputElem.hasAttribute("readonly");
        inputElem.validate = validate;
        inputElem.addEventListener("blur", validate);
        inputElem.addEventListener("focus", function (event) {
          event.stopPropagation();
          var parentInput = getParents(this, "sas-input");
          parentInput.classList.remove("invalid");
          setFocused(parentInput, true);
        });

        if (isComboboxElem) {
          inputElem.listBox = new listBox(containerElem, callback);
        }
      }

      isInitialized = inputs.length > 0;
    }

    init();
  }

  function init() {
    for (var i = 0; i < document.querySelectorAll("form").length; i++) {
      var formElem = document.querySelectorAll("form")[i];
      new flysasForm(formElem, function (elem, data) {
        console.log(elem);
        console.log(data);
      });
    }
  }

  init();
  return {
    init: init
  };
}(window, document);

window.flysasLibrary = window.flysasLibrary || {};

flysasLibrary.toggles = flysasLibrary.toggles || function (window, document) {
  "use strict";

  var toggleContainers = document.querySelectorAll(".toggles");

  function toggleContainer(elemContainer) {
    var toggleBtns = elemContainer.querySelectorAll("button");

    function resetAllBtns() {
      Array.from(toggleBtns).forEach(function (item) {
        item.setAttribute("aria-pressed", "false");
      });
    }

    function switchToggle(event) {
      resetAllBtns();
      this.setAttribute("aria-pressed", "true");
    }

    Array.from(toggleBtns).forEach(function (item) {
      item.addEventListener("click", switchToggle);
    });
  }

  Array.from(toggleContainers).forEach(function (item) {
    new toggleContainer(item);
  });
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

flysasLibrary.sasMarketSelector = flysasLibrary.sasMarketSelector || function (window, document, market) {
  "use strict";

  var appMarket = market.getCountryAndLanguage();
  var code = appMarket.country;
  var lang = appMarket.language;
  var origin = ((document.cookie.match(/(^|;\s)_origin=[^;$]+/gi) || [])[0] || "").split("=")[1] || "ARN";
  var marketJson = window.marketJson;
  var marketForm = document.getElementById("market-form");

  if (!marketJson || !marketForm) {
    return;
  }

  var countrySelectElem = document.getElementById("market-country");
  var selectedCountry = countrySelectElem.querySelector("option[value='" + code + "']");
  var languageSelectElem = document.getElementById("market-language");
  var originSelectElem = document.getElementById("market-origin");
  var btnApply = document.getElementById("market-apply-btn");

  function bindEvents() {
    marketForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });
    countrySelectElem.addEventListener("change", function () {
      loadLanguages();
      loadOrigins();
    });
    btnApply.addEventListener("click", applyMarket);
  }

  function setCookie(name, value) {
    var flysasCookie = name + "=" + escape(value);
    var expiresInDays = 365 * 2;
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + expiresInDays);
    flysasCookie += "; expires=" + expireDate.toUTCString(); //flysasCookie += "; domain=" + location.hostname

    flysasCookie += "; path=/";
    document.cookie = flysasCookie;
  }

  function getMarketJsonCountry() {
    selectedCountry = countrySelectElem.value;
    var marketJsonCountry;

    for (var i = 0; i < marketJson.length; i++) {
      if (marketJson[i].countryCode === selectedCountry) {
        marketJsonCountry = marketJson[i];
        break;
      }
    }

    return marketJsonCountry;
  }

  function loadLanguages() {
    var marketJsonCountry = getMarketJsonCountry();

    if (marketJsonCountry) {
      languageSelectElem.innerHTML = "";

      for (var i = 0; i < marketJsonCountry.languages.length; i++) {
        var optionElem = document.createElement("option");
        optionElem.value = marketJsonCountry.languages[i].languageCode;
        optionElem.innerText = marketJsonCountry.languages[i].language;
        optionElem.setAttribute("data-homepath", marketJsonCountry.languages[i].homePath);
        optionElem.selected = marketJsonCountry.languages[i].languageCode === lang;
        languageSelectElem.appendChild(optionElem);
      }
    }
  }

  function loadOrigins() {
    var marketJsonCountry = getMarketJsonCountry();

    if (marketJsonCountry) {
      originSelectElem.innerHTML = "";

      for (var i = 0; i < marketJsonCountry.origins.length; i++) {
        var optionElem = document.createElement("option");
        optionElem.value = marketJsonCountry.origins[i].airportCode;
        optionElem.innerText = marketJsonCountry.origins[i].cityName;
        optionElem.selected = marketJsonCountry.origins[i].airportCode === origin;
        originSelectElem.appendChild(optionElem);
      }
    }
  }

  function applyMarket() {
    var siteUrl = languageSelectElem[languageSelectElem.selectedIndex].getAttribute("data-homepath");
    var siteEnv = window.location.hostname.split(".")[0];

    if (!siteEnv.match(/^local.+/gi)) {
      siteUrl = siteUrl.replace(/https?:\/\/(.+)\.(fly)?sas\.(se|no|dk|fi|com)/gi, function (a, b) {
        return a.replace(b, siteEnv);
      });
    }

    setCookie("_origin", originSelectElem.value);
    window.location.href = siteUrl;
  }

  if (selectedCountry) {
    selectedCountry.selected = true;
  }

  loadLanguages();
  loadOrigins();
  bindEvents();
}(window, document, flysasLibrary.market);

window.flysasLibrary = window.flysasLibrary || {};

flysasLibrary.sasFlipNumber = function (window, document) {
  "use strict";

  function flysasTimer(timerElem, props) {
    var timer = null;
    var startDate;
    var endDate;
    var diff;
    var days;
    var hours;
    var minutes;
    var seconds;
    var nextDays;
    var nextHours;
    var nextMinutes;
    var nextSeconds;
    var key;
    var i = 0;
    var infinite = true;
    var func = setClockVars;
    var flipContainerElem;
    var daysElem;
    var hoursElem;
    var minutesElem;
    var secondsElem;

    function declareElems() {
      flipContainerElem = timerElem.querySelector(".flip-clock");
      daysElem = timerElem.querySelector(".flip-clock__days");
      hoursElem = timerElem.querySelector(".flip-clock__hours");
      minutesElem = timerElem.querySelector(".flip-clock__minutes");
      secondsElem = timerElem.querySelector(".flip-clock__seconds");
    }

    function reset() {
      flipContainerElem.classList.remove("show");
      daysElem.style.display = "none";
      diff = undefined;
      setTime(daysElem, "00", "00");
      setTime(hoursElem, "00", "00");
      setTime(minutesElem, "00", "00");
      setTime(secondsElem, "00", "00");
    }

    function getDigit(digit) {
      return ("0" + digit).substring(("0" + digit).length - 2);
    }

    function getParsedDate(isoDate) {
      if (_typeof(isoDate) === "object") {
        return isoDate;
      }

      var dateParts = isoDate.match(/\d+/gi);
      var parsedDate = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2], +dateParts[3], +dateParts[4], +dateParts[5]);
      return parsedDate;
    }

    function setTime(elem, currentDigit, nextDigit) {
      if (!elem.querySelector(".card__top")) {
        elem.querySelector(".flip-card").innerText = getDigit(nextDigit);
        return;
      }

      elem.querySelector(".card__top").innerText = getDigit(nextDigit);
      elem.querySelector(".card__bottom").setAttribute("data-value", getDigit(currentDigit));
      elem.querySelector(".card__back").setAttribute("data-value", getDigit(currentDigit));
      elem.querySelector(".card__back .card__bottom").setAttribute("data-value", getDigit(nextDigit));

      if (currentDigit !== nextDigit) {
        elem.classList.remove("flip");
        void elem.offsetWidth;
        elem.classList.add("flip");
      }
    }

    function setClockVars() {
      var date = new Date();
      var dateNext = new Date(date.getTime() + 1000);
      days = 0;
      nextDays = 0;
      hours = date.getHours();
      nextHours = dateNext.getHours();
      minutes = date.getMinutes();
      nextMinutes = dateNext.getMinutes();
      seconds = date.getSeconds();
      nextSeconds = dateNext.getSeconds();
    }

    function setCountdownVars() {
      var now = new Date();
      diff = endDate.getTime() - now.getTime();
      seconds = Math.floor(diff / 1000 % 60);
      nextSeconds = seconds === 0 ? 59 : seconds - 1;
      minutes = Math.floor(diff / 1000 / 60 % 60);
      nextMinutes = minutes;

      if (seconds === 0) {
        nextMinutes = minutes === 0 ? 59 : minutes - 1;
      }

      hours = Math.floor(diff / 1000 / 60 / 60 % 24);
      nextHours = hours;

      if (seconds === 0 && minutes === 0) {
        nextHours = hours === 0 ? 23 : hours - 1;
      }

      days = Math.floor(diff / 1000 / 60 / 60 / 24);
      nextDays = days;

      if (seconds === 0 && minutes === 0 && hours === 0) {
        nextDays = days === 0 ? days : days - 1;
      }
    }

    function loop() {
      cancelAnimationFrame(timer);

      if (diff > 1000 || infinite) {
        timer = requestAnimationFrame(loop);
      }

      if (i++ % 20) {
        return;
      }

      func();

      if (diff < 1000) {
        return;
      }

      if (key !== "" + days + "." + hours + "." + minutes + "." + seconds) {
        setTime(daysElem, days, nextDays);
        setTime(hoursElem, hours, nextHours);
        setTime(minutesElem, minutes, nextMinutes);
        setTime(secondsElem, seconds, nextSeconds);
      }

      key = "" + days + "." + hours + "." + minutes + "." + seconds;
    }

    function init() {
      props = props || {};
      declareElems();

      if (!flipContainerElem) {
        return;
      }

      reset();

      if (props.startDate && props.endDate) {
        var _now = new Date();

        startDate = getParsedDate(props.startDate);

        if (_now >= startDate) {
          endDate = getParsedDate(props.endDate);
          diff = endDate.getTime() - _now.getTime();
          daysElem.style.display = "inline-block";
          func = setCountdownVars;
          infinite = false;
        }
      }

      loop();
      flipContainerElem.classList.add("show");
    }

    init(); //init({startDate:"2019-11-25T12:00:00", endDate:"2019-11-29T22:30:00"})

    return {
      init: init
    };
  }

  var timers = document.querySelectorAll(".flysas-widget.flysas-timer");

  for (var i = 0; i < timers.length; i++) {
    var timerElem = timers[i];
    var props = {};

    if (timerElem.getAttribute("data-minutes")) {
      var now = new Date();
      props.startDate = now;
      props.endDate = new Date(now.getTime() + 1000 * 60 * 5);
    }

    new flysasTimer(timerElem, props);
  }
}(window, document);

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

(function (window, document) {
  "use strict";

  var labsProfileCards = document.querySelectorAll(".labs-profile-card");
  labsProfileCards.forEach(function (card) {
    card.querySelector("input").addEventListener("change", function () {
      card.classList.toggle("selected", this.checked);
    });
  });
})(window, document);