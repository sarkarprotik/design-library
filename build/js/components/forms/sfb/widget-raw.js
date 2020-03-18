"use strict";

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

var flysasApp = window.flysasApp || {};
flysasApp.forms = window.flysasApp.forms || {};
flysasApp.forms.sfb = window.flysasApp.forms.sfb || {};

flysasApp.forms.sfb.widget = flysasApp.forms.sfb.widget || function (window, document, market) {
  "use strict";

  var appMarket = market.getCountryAndLanguage();
  var code = appMarket.country;
  var lang = appMarket.language;
  code = ((window.location.search.match(/(\?|\&)countrycode=[^\&|$]+/gi) || [])[0] || "").replace(/(\?|\&)countrycode=/gi, "") || code;
  lang = ((window.location.search.match(/(\?|\&)languagecode=[^\&|$]+/gi) || [])[0] || "").replace(/(\?|\&)languagecode=/gi, "") || lang;
  var type;
  var widgetContainerElem = document.querySelector(".flysas-sfb-form");

  if (!widgetContainerElem) {
    return;
  }

  type = widgetContainerElem.classList.contains("flysas-sfb-corporate") ? "corporate" : "sports";
  var isSportsForm = type === "sports";
  var isCorporateForm = type === "corporate";
  var widgetEndpoint = "/widgets/forms/" + type + "/" + code + "-" + lang;
  var postDataEndpoint = "/widgets/forms/" + type;

  if (window.location.hostname.match(/^((www|test)\.)(fly)?sas\.(se|no|dk|fi|com)$/gi)) {
    widgetEndpoint = "/v2/de-design-library" + widgetEndpoint;
    postDataEndpoint = "/v2/de-design-library" + postDataEndpoint;
  }

  var widgetElem;
  var widgetFormElem;
  var hostname = "";

  function getElementValue(id) {
    var elem = document.getElementById(id);

    if (!elem) {
      return "";
    }

    if (elem.type === "checkbox") {
      return elem.checked ? elem.value.trim() : "";
    }

    return elem.value.trim();
  }

  function setElementValue(id, value) {
    var elem = document.getElementById(id);

    if (!elem) {
      return;
    }

    if (elem.type === "checkbox") {
      elem.checked = value;
    }

    elem.value = value;
    var sasInputElem = document.querySelector("[data-name='" + id.replace(type + "-", "") + "']");

    if (sasInputElem) {
      sasInputElem.classList.add("focused");
    }
  }

  function insertJs(jsElem) {
    var jsEl = document.createElement("script");
    jsEl.textContent = jsElem.innerText;
    document.head.insertBefore(jsEl, document.head.childNodes[document.head.childNodes.length - 1].nextSibling);
  }

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

    if (props.data) {
      xhttp.setRequestHeader("Content-type", "application/json");

      if (typeof props.data === "string") {
        xhttp.send(props.data);
      } else {
        var postData = [];

        for (var el in props.data) {
          postData.push(el + "=" + props.data[el]);
        }

        xhttp.send(postData.join("&"));
      }
    } else {
      xhttp.send();
    }
  }

  function initWidget(html) {
    widgetContainerElem.innerHTML = html;
    var scriptsToAppend = widgetContainerElem.getElementsByTagName("script");

    for (var i = 0; i < scriptsToAppend.length; i++) {
      insertJs(scriptsToAppend[i]);
    }

    widgetElem = widgetContainerElem.querySelector(".flysas-forms-widget");
    widgetFormElem = widgetContainerElem.querySelector("form");

    if (!widgetFormElem) {
      return;
    }

    bindEvents();
  }

  function bindEvents() {
    widgetFormElem.addEventListener("submit", sendForm);
    widgetElem.querySelector("h2").addEventListener("click", fillTestData);
  }

  function fillTestData(event) {
    if (!event.shiftKey) {
      return;
    }

    var organisationnumbers = {
      "se": "123456-7890",
      "no": "123456789",
      "dk": "12345678",
      "fi": "1234567-8",
      "lu": "12345678"
    };
    setElementValue(type + "-organisationname", "Testet IK");
    setElementValue(type + "-organisationnumber", organisationnumbers[code]);
    setElementValue(type + "-address", "Gatan 1");
    setElementValue(type + "-zip", "12345");
    setElementValue(type + "-city", "Staden");
    setElementValue(type + "-firstname", "Krakel");
    setElementValue(type + "-lastname", "Spektakel");
    setElementValue(type + "-email", "krakel@spektakel.com");
    setElementValue(type + "-tel", "085554433");
    setElementValue(type + "-sportorganisation", true);
    setElementValue(type + "-approve-yes", true);
  }

  function toggleSubmit() {
    var submitElem = widgetFormElem.querySelector("button");
    var isDisabled = submitElem.disabled;

    if (!isDisabled) {
      submitElem.disabled = true;
    } else {
      submitElem.disabled = false;
    }
  }

  function sendForm(event) {
    event.preventDefault();
    toggleSubmit();
    var isValidForm = true;
    var nonValidElem;
    var mandatoryFormFields = document.querySelectorAll(".flysas-sfb-form form .mandatory input");

    for (var i = 0; i < mandatoryFormFields.length; i++) {
      if (mandatoryFormFields[i].type === "checkbox") {
        isValidForm = mandatoryFormFields[i].checked;
      } else {
        isValidForm = mandatoryFormFields[i].validate ? mandatoryFormFields[i].validate() : true;
      }

      if (!isValidForm) {
        nonValidElem = mandatoryFormFields[i];
        break;
      }
    }

    if (!isValidForm) {
      //eventuellt focus och scroll
      nonValidElem.scrollIntoView({
        behavior: "smooth"
      });
      return;
    }

    var formData = {
      //"context": widgetFormElem.getAttribute("data-type") || "",
      "companyDetails": {
        "companyName": getElementValue(type + "-organisationname"),
        "vatOrOrgNumber": getElementValue(type + "-organisationnumber"),
        "address": getElementValue(type + "-address"),
        "zipCode": getElementValue(type + "-zip"),
        "city": getElementValue(type + "-city"),
        "state": ""
      },
      "primaryTravelManager": {
        "firstName": getElementValue(type + "-firstname"),
        "lastName": getElementValue(type + "-lastname"),
        "email": getElementValue(type + "-email"),
        "phoneNumber": getElementValue(type + "-tel")
      },
      "alternativeTravelManager": {
        "firstName": getElementValue(type + "-firstname-secondary"),
        "lastName": getElementValue(type + "-lastname-secondary"),
        "email": getElementValue(type + "-email-secondary")
      }
    };

    if (isSportsForm) {
      formData.companyDetails["country"] = code.toUpperCase();
      formData.companyDetails["soContactSportOrg"] = getElementValue(type + "-sportorganisation");
      formData.companyDetails["soContactForm"] = "Sport";
      formData.companyDetails["soContactSASContact"] = "Sport Agreements";
    }

    var isNordic = code === "se" || code === "no" || code === "dk" || code === "fi";

    if (!isNordic) {
      var countryCodeFormData = getElementValue(type + "-country");
    } else {
      var countryCodeFormData = code.toUpperCase();
    }

    if (isCorporateForm) {
      formData.companyDetails["country"] = countryCodeFormData;
    }

    console.log("POST", formData);
    var postData = JSON.stringify(formData);
    loadMarkup({
      url: postDataEndpoint,
      data: postData
    }, function (response) {
      response = JSON.parse(response);
      var messageElem = response.statusCode === 200 ? widgetElem.querySelector(".success") : widgetElem.querySelector(".failure");

      if (!messageElem) {
        return;
      }

      messageElem.hidden = false;
      messageElem.scrollIntoView({
        behavior: "smooth"
      });

      if (messageElem.classList.contains("failure")) {
        toggleSubmit();
      }
    });
  }

  loadMarkup({
    url: widgetEndpoint
  }, initWidget);
}(window, document, flysasLibrary.market);