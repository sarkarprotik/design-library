window.flysasLibrary = window.flysasLibrary || {};
flysasLibrary.tabs = flysasLibrary.tabs || ((window, document) => {
  "use strict";

  const tabContainers = document.querySelectorAll(".tabs");

  function tabContainer(elemContainer) {
    const tabList = elemContainer.querySelector(".tablist");
    const tabListBtns = tabList ? tabList.children : [];
    const tabListPanels = elemContainer.querySelectorAll(".tabpanel");

    function resetAllBtns() {
      Array.from(tabListBtns).forEach((item) => {
        item.setAttribute("aria-selected", "false");
      });
    }

    function resetAllPanels() {
      Array.from(tabListPanels).forEach((item) => {
        item.setAttribute("hidden", "");
      });
    }

    function switchTab(event) {
      resetAllBtns();
      resetAllPanels();
      this.setAttribute("aria-selected", "true");
      document.getElementById(this.getAttribute("aria-controls")).removeAttribute("hidden");
    }

    Array.from(tabListBtns).forEach((item) => {
      item.addEventListener("click", switchTab);
    });
  }

  Array.from(tabContainers).forEach((item) => {
    new tabContainer(item);
  });
})(window, document);
