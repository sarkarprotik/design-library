var flysasLibrary = window.flysasLibrary || {}
flysasLibrary.sasSearch = flysasLibrary.sasSearch || (function(window, document) {
  "use strict"

  var searchModule = document.querySelector(".sas-search");
  function load() {
    var searchField = searchModule.querySelector(".col-form-field")
    var searchButton = searchModule.querySelector(".search-submit")
    var searchInput = searchModule.querySelector("input")
    var searchClose = searchModule.querySelector(".close-button")

    searchButton.addEventListener("click", function(event) {
      if (!searchButton.classList.contains("open")) {
        event.preventDefault()
        searchField.classList.add("open")
        searchButton.classList.add("open")
        searchInput.focus()
      }

      searchClose.addEventListener("click", function(event) {
        event.preventDefault()
        searchField.classList.remove("open")
        searchButton.classList.remove("open")
      })
    })
  }

  if (searchModule) {
    load();
  }

  return {
    load: load
  }
})(window, document);
