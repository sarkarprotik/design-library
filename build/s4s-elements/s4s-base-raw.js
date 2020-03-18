class S4SBase extends HTMLElement {
  constructor() {
    super()
    this.elements = {}
  }

  init(template) {
    this.html = this.innerHTML.trim()
    this.innerHTML = ""

    this.appendTemplate(template)
    this.setSlotContent()
    this.setElements()
  }

  appendTemplate(template, parent) {
    const self = (parent || this)
    if (template) {
      const templateElem = document.createElement("template")
      templateElem.innerHTML = template
      self.appendChild(document.importNode(templateElem.content, true))
      return self.lastElementChild
    }
    return self
  }

  setSlotContent() {
    if (this.querySelector(".slot-content") && this.html) {
      this.querySelector(".slot-content").innerHTML = this.html
    }
  }

  setElements(parent) {
    const self = (parent || this)
    self.elements = self.elements || {}
    const elements = self.querySelectorAll("[element]")
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      const elementName = element.getAttribute("element").replace(/-([\w]{1})/gi, group => {
        return group.replace("-", "").toUpperCase()
      })
      self.elements[elementName] = element

      const baseAttributeValue = self.getAttribute(elementName) || self.getAttribute(element.getAttribute("element"))
      if (baseAttributeValue) {
        switch (element.tagName) {
          case "IMG":
            element.src = baseAttributeValue
            break
          default:
            element.innerText = baseAttributeValue
            break
        }
      }
    }
  }

  getParentElement(elem, selector) {
    while (elem.parentElement) {
      if (elem.classList.contains(selector) || elem.tagName === selector.toUpperCase()) {
        return elem
      }
      elem = elem.parentElement
    }
  }

  publish(key, value) {
    window.dispatchEvent(new CustomEvent(key, { detail: value }))
  }

  subscribe(key, callback) {
    window.addEventListener(key, callback)
  }

  httpRequest(url, options, callback) {
    fetch(url, options)
      .then(callback)
  }
}
