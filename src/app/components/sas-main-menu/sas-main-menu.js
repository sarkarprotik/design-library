window.flysasLibrary = window.flysasLibrary || {}
flysasLibrary.sasMainMenu = (function(window, document) {
  "use strict"

  const mainMenuElem = document.querySelector('.sas-main-menu')
  if (!mainMenuElem) {
    return
  }

  new MainMenu()

  function MainMenu() {
    const isMobile = (window.innerWidth <= 991)
    const categories = []

    const mainBody = document.body
    const mainMenuTrigger = mainMenuElem.querySelector(".hamburger-toggle")
    const mainMenuList = mainMenuElem.querySelector("ul")
    const mainMenuListItems = Array.from(mainMenuList.children)
    const mainHeader = document.querySelector('.sas-main-header')
    if (isMobile) {
      mainMenuTrigger.addEventListener("click", slide)
      mainMenuList.setAttribute("aria-hidden", "true")
      mainMenuList.addEventListener('transitionend', () => {
        mainMenuList.style.height = "auto"
      })
    }

    function slide(event) {
      event.preventDefault()
      mainHeader.classList.toggle("menu-expanded")
      mainMenuList.classList.toggle("expanded")
      mainMenuTrigger.classList.toggle("expanded")
      mainBody.classList.toggle("menu-is-active")

      if (mainMenuTrigger.classList.contains("expanded")) {
        mainMenuTrigger.setAttribute("aria-expanded", "true")
        mainMenuList.setAttribute("aria-hidden", "false")
      } else {
        mainMenuTrigger.setAttribute("aria-expanded", "false")
        mainMenuList.setAttribute("aria-hidden", "true")
      }
    }

    mainMenuListItems.forEach(item => {
      categories.push(new NavCategory(item))
    })

    function NavCategory(categoryElem) {
      const categoryChildList = categoryElem.querySelector("ul")
      if (!categoryChildList) {
        return
      }

      const expandTrigger = categoryElem.querySelector("a")
      const collapsedHeight = expandTrigger.clientHeight
      const expandedHeight = categoryElem.clientHeight
      //const mobileTop = mainMenuList.offsetTop

      if (expandTrigger.classList.contains("active")) {
        categoryElem.style.height = expandedHeight + "px"
      } else {
        categoryElem.style.height = collapsedHeight + "px"
      }
      expandTrigger.addEventListener("click", (event) => {
        event.preventDefault()
        event.stopPropagation()
        const isOpen = expandTrigger.classList.contains("expanded")
        if (!isMobile) {
          hideAll()
          if (!isOpen) {
            toggle(true)
          }
        } else {
          toggle(!isOpen)
        }
      })

      mainHeader.addEventListener("click", event => {
        if (!isMobile) {
          hideAll()
        }
      })

      function toggle(value) {
        expandTrigger.setAttribute("aria-expanded", value.toString())
        if (value) {
          expandTrigger.classList.add("expanded")
          categoryChildList.classList.add("expanded")
          mainHeader.classList.add("expanded")
        } else {
          expandTrigger.classList.remove("expanded")
          categoryChildList.classList.remove("expanded")
          mainHeader.classList.remove("expanded")
        }

        categoryElem.style.height = (value ? expandedHeight : collapsedHeight) + "px"
      }

      return {
        toggle,
      }
    }

    function hideAll() {
      categories.forEach(category => {
        if (category.toggle) {
          category.toggle(false)
        }
      })
    }
  }
})(window, document)
