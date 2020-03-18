window.flysasLibrary = window.flysasLibrary || {};
flysasLibrary.accordions = flysasLibrary.accordions || ((window, document) => {
  "use strict";

  //let accordionElems = document.querySelectorAll(".flysas-accordion")

  function accordion(elem) {
    const btnElem = elem.querySelector(".btn-toggle")
    const contentElem = elem.querySelector(".accordion-content")
    const isOpen = elem.open === true || elem.getAttribute("data-expanded") === "true"

    if (!btnElem || !contentElem) {
      elem.style.display = "none"
      return
    }

    elem.toggle = function() {
      const isExpanded = btnElem.getAttribute("aria-expanded") === "true"
      elem.style.height = (isExpanded ? btnHeight : btnHeight + contentHeight + 2) + "px"
      btnElem.setAttribute("aria-expanded", !isExpanded)

      if (isExpanded) {
        setTimeout(function() { contentElem.classList.add("hidden") }, 550)
      } else {
        contentElem.classList.remove("hidden")
      }
    }

    const iconElem = document.createElement("i")
    iconElem.className = "accordion-arrow"
    btnElem.appendChild(iconElem)

    const btnHeight = btnElem.clientHeight + 8
    const contentHeight = contentElem.clientHeight

    elem.style.height = btnHeight + "px"
    contentElem.classList.add("hidden")
    //contentElem.style.maxWidth = btnElem.clientWidth + "px"

    let discardClick = false
    btnElem.addEventListener("click", function(event) {
      event.preventDefault()
      if (discardClick) {
        return
      }
      discardClick = true
      elem.toggle()
      setTimeout(function() { discardClick = false }, 500)
    })

    if (isOpen) {
      elem.toggle()
    }

    elem.style.opacity = 1
  }

  function init(accordionElems) {
    accordionElems = accordionElems || document.querySelectorAll(".flysas-accordion")

    for (var i = 0; i < accordionElems.length; i++) {
      const btnElem = accordionElems[i].querySelector(".btn-toggle")
      const isValid = btnElem.clientHeight > 0

      if (accordionElems[i].initiated || !isValid) {
        continue
      }
      accordionElems[i].initiated = true

      new accordion(accordionElems[i])
    }
  }

  init()
  window.addEventListener("DOMContentLoaded", init)
  window.addEventListener("load", init)

  return {
    init: init
  }
})(window, document);
