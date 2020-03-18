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

window.flysasLibrary = window.flysasLibrary || {};

flysasLibrary.icons = flysasLibrary.icons || function (window, document, config) {
  "use strict";

  var iconConfig = window.iconConfig || {
    default: true,
    extra: false,
    other: false,
    flags: false
  };
  var isInitialized = false;

  function loadSvg(id, pathname) {
    if (document.getElementById(id)) {
      return;
    }

    var ajax = new XMLHttpRequest();
    ajax.open("GET", config.appHostname + pathname, true);
    ajax.send();

    ajax.onload = function () {
      var div = document.createElement("div");
      div.id = id;
      div.style.display = "none";
      div.setAttribute("hidden", "");
      div.innerHTML = ajax.responseText;
      document.body.appendChild(div);
    };
  }

  function load() {
    if (isInitialized) {
      return;
    }

    if (iconConfig.default) {
      loadSvg("flysas-icons-default", "/v2/de-design-library/assets/icons/symbol/svg/sprite.symbol.svg");
    }

    if (iconConfig.extra) {
      loadSvg("flysas-icons-extra", "/v2/de-design-library/assets/icons-extra/symbol/svg/sprite.symbol.svg");
    }

    if (iconConfig.other) {
      loadSvg("flysas-icons-other", "/v2/de-design-library/assets/icons-other/symbol/svg/sprite.symbol.svg");
    }

    if (iconConfig.flags) {
      loadSvg("flysas-icons-flags", "/v2/de-design-library/assets/icons-flags/symbol/svg/sprite.symbol.svg");
    }

    isInitialized = true;
  }

  load();
  return {
    load: load
  };
}(window, document, flysasLibrary.config);