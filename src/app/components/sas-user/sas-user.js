window.flysasLibrary = window.flysasLibrary || {}
flysasLibrary.sasUser = flysasLibrary.sasUser || (function(window, document) {
  "use strict"

  if (!window.sessionStorage) {
    return
  }

  const hasUserCookie = document.cookie.match(/NEW_SAS_SSO_LOGGEDIN=.+/gi)
  const loginElem = document.querySelector(".sas-main-header .btn-login")
  const userElem = document.querySelector(".sas-main-header .user")
  const basicProfile = JSON.parse(window.sessionStorage.getItem("basicProfile") || "{}")
  let customer

  if (!loginElem || !userElem) {
    return
  } else if (!hasUserCookie || !basicProfile.customerSessionId) {
    window.sessionStorage.removeItem("basicProfile")
    userElem.style.display = "none"
    loginElem.style.display = "flex"
  }

  function loadJs(path, async, cb) {
    var jsEl = document.createElement("script");
    jsEl.src = path;
    jsEl.async = async;
    jsEl.onload = cb;

    document.head.insertBefore(jsEl, document.head.childNodes[document.head.childNodes.length-1].nextSibling);
  }

  function setProfileData() {
    if (basicProfile.eb) {
      userElem.querySelector(".initials").classList.add("profile-" + basicProfile.currentTierCode.toLowerCase())
      userElem.querySelector(".points > span").innerText = basicProfile.formattedPoints
    }
  }

  function setInitials() {
    userElem.querySelector(".initials").innerText = basicProfile.firstName[0] + basicProfile.lastName[0]
  }

  function bindEvents() {
    loginElem.addEventListener("click", showCustomerModal)
  }

  function displayModal() {
    customer = new Customer("#customer", customerConfig)
    customer.show()
  }

  function showCustomerModal() {
    if (customer && customer.show) {
      displayModal()
      return
    }

    loadJs("/v2/de-design-library/assets/js/customer.js", true, displayModal);
  }

  bindEvents()
  if (hasUserCookie && basicProfile.customerSessionId) {
    setProfileData();
    setInitials();
    loginElem.style.display = "none"
    userElem.style.display = "flex"
  }
})(window, document)
