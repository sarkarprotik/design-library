class FlysasBase extends HTMLElement {
  constructor() {
    super()

    this.html = this.innerHTML
    this.innerHTML = ""
    this.elements = {}
  }

  init(template) {
    if (template) {
      const templateElem = document.createElement("template")
      templateElem.innerHTML = template
      this.appendChild(document.importNode(templateElem.content, true))
    }
    this.setSlotContent()
    this.setElements()
  }

  setSlotContent() {
    if (this.querySelector(".slot-content") && this.html) {
      this.querySelector(".slot-content").innerHTML = this.html
    }
  }

  setElements() {
    const elements = this.querySelectorAll("[element]")
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      this.elements[element.getAttribute("element")] = element
    }
  }

  publish(key, value) {
    window.dispatchEvent(new CustomEvent(key, { detail: value }))
  }
}
