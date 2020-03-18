@@include("../../config.js")
@@include("../../partials/market/market.js")

var flysasApp = window.flysasApp || {};
flysasApp.mainFooter = window.flysasApp.mainFooter || {};
flysasApp.mainFooter.widget = (function(window, document, config, market) {
  "use strict";

  var appMarket = market.getCountryAndLanguage();
  var code = appMarket.country;
  var lang = appMarket.language;
  var hostname = "";
  var widgetEndpoint = config.appHostname + "/v2/de-design-library/widgets/sas-main-footer/" + code + "-" + lang;

  function insertJs(jsElem) {
    var jsEl = document.createElement("script");
    jsEl.textContent = jsElem.innerText;
    document.head.insertBefore(jsEl, document.head.childNodes[document.head.childNodes.length-1].nextSibling);
  }

  function loadMarkup(props, cb) {
    var method = "GET";
    var url = (!props.url.match(/^http/gi)) ? (hostname + props.url) : props.url;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
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

  loadMarkup({ url: widgetEndpoint }, initWidget);
})(window, document, flysasLibrary.config, flysasLibrary.market);

