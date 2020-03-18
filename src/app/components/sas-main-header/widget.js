var flysasApp = window.flysasApp || {};
flysasApp.mainHeader = window.flysasApp.mainHeader || {};
flysasApp.mainHeader.widget = (function(window, document) {
  "use strict";

  var code = (document.cookie.match(/(^|;\s)_country=([^;$]+)/i) || [])[2] || "lu";
  var lang = (document.cookie.match(/(^|;\s)_language=([^;$]+)/i) || [])[2] || "en";
  var hostname = "";
  var widgetEndpoint = "/widgets/sas-main-header/" + code + "-" + lang;
  if (window.location.hostname.match(/^((www|test)\.)(fly)?sas\.(se|no|dk|fi|com)$/gi)) {
    widgetEndpoint = "/v2/de-design-library" + widgetEndpoint;
  }

  function loadCss(path) {
    path = (!path.match(/^http/gi)) ? (hostname + path) : path;
    var cssEl = document.createElement("link");
    cssEl.rel = "stylesheet";
    cssEl.href = path;

    document.head.insertBefore(cssEl, document.head.childNodes[document.head.childNodes.length-1].nextSibling);
  }

  function loadJs(path, cb) {
    path = (!path.match(/^http/gi)) ? (hostname + path) : path;
    var jsEl = document.createElement("script");
    jsEl.src = path;
    jsEl.async = true;
    jsEl.onload = cb;

    document.head.insertBefore(jsEl, document.head.childNodes[document.head.childNodes.length-1].nextSibling);
  }

  function insertJs(jsElem) {
    var jsEl = document.createElement("script");
    jsEl.textContent = jsElem.innerText;
    document.head.insertBefore(jsEl, document.head.childNodes[document.head.childNodes.length-1].nextSibling);
  }

  function loadMarkup(props, cb) {
    var method = props.data ? "POST" : "GET";
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
    if (props.data) {
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      var postData = [];
      for (var el in props.data) {
        postData.push(el + "=" + props.data[el]);
      }
      xhttp.send(postData.join("&"));
    } else {
      xhttp.send();
    }
  }

  function initWidget(html) {
    var headerContainerElem = document.createElement("div");
    headerContainerElem.innerHTML = html;
    document.body.insertBefore(headerContainerElem, document.body.firstChild);
    var scriptsToAppend = headerContainerElem.getElementsByTagName("script");
    for (var i = 0; i < scriptsToAppend.length; i++) {
      insertJs(scriptsToAppend[i]);
    }
  }

  loadMarkup({ url: widgetEndpoint }, initWidget);
})(window, document);

