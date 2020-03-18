class S4SLoginBase extends S4SBase {
  constructor() {
    super()
  }

  createElement(element, options) {
    const { classes, innerText, innerHTML, attributes } = options
    const result = document.createElement(element)

    if (innerHTML) {
      result.innerHTML = innerHTML
    } else if (innerText) {
      result.innerText = innerText
    }
    if (classes) {
      classes.forEach(className => {
        result.classList.add(className)
      })
    }
    if (attributes) {
      for (const key in attributes) {
        result.setAttribute(key, attributes[key])
      }
    }
    return result
  }

  appendChildren(component, elements) {
    return elements.forEach(element => {
      if (element) {
        component.appendChild(element)
      }
    })
  }
}
