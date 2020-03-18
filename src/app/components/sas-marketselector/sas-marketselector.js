window.flysasLibrary = window.flysasLibrary || {}
flysasLibrary.sasMarketSelector = flysasLibrary.sasMarketSelector || (function(window, document, market) {
  "use strict"

  var appMarket = market.getCountryAndLanguage();
  var code = appMarket.country;
  var lang = appMarket.language;
  var origin = ((document.cookie.match(/(^|;\s)_origin=[^;$]+/gi) || [])[0] || "").split("=")[1] || "ARN"
  var marketJson = window.marketJson
  var marketForm = document.getElementById("market-form")
  if(!marketJson || !marketForm) {
    return
  }
  var countrySelectElem = document.getElementById("market-country")
  var selectedCountry = countrySelectElem.querySelector("option[value='" + code + "']")
  var languageSelectElem = document.getElementById("market-language")
  var originSelectElem = document.getElementById("market-origin")
  var btnApply = document.getElementById("market-apply-btn")

  function bindEvents() {
    marketForm.addEventListener("submit", function(event) {
      event.preventDefault()
    })

    countrySelectElem.addEventListener("change", function() {
      loadLanguages()
      loadOrigins()
    })

    btnApply.addEventListener("click", applyMarket)
  }

  function setCookie(name, value) {
    var flysasCookie = name + "=" + escape(value)

    var expiresInDays = (365 * 2)
    var expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + expiresInDays)

    flysasCookie += "; expires=" + expireDate.toUTCString()
    //flysasCookie += "; domain=" + location.hostname
    flysasCookie += "; path=/"

    document.cookie = flysasCookie
  }

  function getMarketJsonCountry() {
    selectedCountry = countrySelectElem.value
    var marketJsonCountry;
    for (var i = 0; i < marketJson.length; i++) {
      if (marketJson[i].countryCode === selectedCountry) {
        marketJsonCountry = marketJson[i]
        break
      }
    }
    return marketJsonCountry
  }

  function loadLanguages() {
    var marketJsonCountry = getMarketJsonCountry()
    if (marketJsonCountry) {
      languageSelectElem.innerHTML = "";
      for (var i = 0; i < marketJsonCountry.languages.length; i++) {
        var optionElem = document.createElement("option")
        optionElem.value = marketJsonCountry.languages[i].languageCode
        optionElem.innerText = marketJsonCountry.languages[i].language
        optionElem.setAttribute("data-homepath", marketJsonCountry.languages[i].homePath)
        optionElem.selected = (marketJsonCountry.languages[i].languageCode === lang)
        languageSelectElem.appendChild(optionElem)
      }
    }
  }

  function loadOrigins() {
    var marketJsonCountry = getMarketJsonCountry()
    if (marketJsonCountry) {
      originSelectElem.innerHTML = "";
      for (var i = 0; i < marketJsonCountry.origins.length; i++) {
        var optionElem = document.createElement("option")
        optionElem.value = marketJsonCountry.origins[i].airportCode
        optionElem.innerText = marketJsonCountry.origins[i].cityName
        optionElem.selected = (marketJsonCountry.origins[i].airportCode === origin)
        originSelectElem.appendChild(optionElem)
      }
    }
  }

  function applyMarket() {
    var siteUrl = languageSelectElem[languageSelectElem.selectedIndex].getAttribute("data-homepath")
    var siteEnv = window.location.hostname.split(".")[0]
    if (!siteEnv.match(/^local.+/gi)) {
      siteUrl = siteUrl.replace(/https?:\/\/(.+)\.(fly)?sas\.(se|no|dk|fi|com)/gi, function(a, b) { return a.replace(b, siteEnv) })
    }

    setCookie("_origin", originSelectElem.value)
    window.location.href = siteUrl
  }

  if (selectedCountry) {
    selectedCountry.selected = true
  }
  loadLanguages()
  loadOrigins()
  bindEvents()

})(window, document, flysasLibrary.market);
