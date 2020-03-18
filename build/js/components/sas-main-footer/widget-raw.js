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
flysasApp.mainFooter = window.flysasApp.mainFooter || {};

flysasApp.mainFooter.widget = function (window, document, config, market) {
  "use strict";

  var appMarket = market.getCountryAndLanguage();
  var code = appMarket.country;
  var lang = appMarket.language;
  var hostname = "";
  var widgetEndpoint = config.appHostname + "/v2/de-design-library/widgets/sas-main-footer/" + code + "-" + lang;

  function insertJs(jsElem) {
    var jsEl = document.createElement("script");
    jsEl.textContent = jsElem.innerText;
    document.head.insertBefore(jsEl, document.head.childNodes[document.head.childNodes.length - 1].nextSibling);
  }

  function loadMarkup(props, cb) {
    var method = "GET";
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

  function initWidget(html) {
    var footerContainerElem = document.createElement("div");
    footerContainerElem.innerHTML = html;
    document.body.appendChild(footerContainerElem);
    var scriptsToAppend = footerContainerElem.getElementsByTagName("script");

    for (var i = 0; i < scriptsToAppend.length; i++) {
      insertJs(scriptsToAppend[i]);
    }
  }

  loadMarkup({
    url: widgetEndpoint
  }, initWidget);
}(window, document, flysasLibrary.config, flysasLibrary.market);