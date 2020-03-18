window.flysasLibrary = window.flysasLibrary || {};
flysasLibrary.icons = flysasLibrary.icons || (function(window, document, config) {
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
    ajax.onload = function() {
      var div = document.createElement("div");
      div.id = id;
      div.style.display = "none";
      div.setAttribute("hidden", "");
      div.innerHTML = ajax.responseText;
      document.body.appendChild(div);
    }
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
  }
})(window, document, flysasLibrary.config);
