@@include("partials/market/market.js")

var flysasLibrary = window.flysasLibrary || {};
flysasLibrary.config = flysasLibrary.config || (function(window, document, market) {
  var localHostname = "";
  var prodHostname = "https://www.flysas.com";
  var isV2Hostname = !!(window.location.hostname.match(/^(www|test)\.(fly)?sas\..+/gi));
  var isLocalEnv = !!((window.location.hostname.match(/^(local|192).+/gi) && window.location.port === "3000") || window.location.hostname.match(/^(de-design-library).+/gi));
  var appHostname = (!isV2Hostname && !isLocalEnv) ? prodHostname : localHostname;
  var market = market.getCountryAndLanguage();

  return {
    appHostname: appHostname,
    hostname: localHostname,
    market: market
  };
})(window, document, flysasLibrary.market);
