window.flysasLibrary = window.flysasLibrary || {};
flysasLibrary.toggles = flysasLibrary.toggles || (function(window, document) {
  "use strict";

  const toggleContainers = document.querySelectorAll(".toggles");

  function toggleContainer(elemContainer) {
    const toggleBtns = elemContainer.querySelectorAll("button");

    function resetAllBtns() {
      Array.from(toggleBtns).forEach((item) => {
        item.setAttribute("aria-pressed", "false");
      });
    }

    function switchToggle(event) {
      resetAllBtns();
      this.setAttribute("aria-pressed", "true");
    }

    Array.from(toggleBtns).forEach((item) => {
      item.addEventListener("click", switchToggle);
    });
  }

  Array.from(toggleContainers).forEach((item) => {
    new toggleContainer(item);
  });
})(window, document);
