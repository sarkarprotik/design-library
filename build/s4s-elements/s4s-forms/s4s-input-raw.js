;(function(window, document, s4s) {
  class S4SInput extends S4SInputBase {
    constructor() {
      super()
    }

    connectedCallback() {
      this.init(s4s.templates.formField)
      this.prepare()
      this.addElements()
      this.render()
      this.valid = false
    }

    addElements() {
      this.createInput()

      this.elements.formField.appendChild(this.elements.input)
      this.elements.formField.setAttribute("for", this.elements.input.id)

      this.elements.message.innerText = this.message

      this.elements.label.innerText = this.label
      this.createTooltip()
    }

    createInput() {
      let elem
      if (["select", "textarea"].indexOf(this.type) > -1) {
        elem = document.createElement(this.type)
      } else {
        elem = document.createElement("input")
        elem.type = this.type
      }
      elem.name = this.name
      elem.id = this.id || `${this.name.replace(/[^a-z]/gi, "")}${Math.floor(Math.random() * 1000)}`

      elem.setAttribute("data-validation", this.validation)
      this.addFocusAndBlurEvents(elem)

      this.elements.input = elem
    }

    static get observedAttributes() {
      return ["options"]
    }

    attributeChangedCallback() {
      this.render()
    }

    render() {
      if (!this.connected) {
        return
      }

      if (this.type === "select" && this.options) {
        this.elements.input.innerHTML = ""
        for (let i = 0; i < this.options.items.length; i++) {
          const option = this.options.items[i]
          const optionElem = document.createElement("option")
          optionElem.value = option.value
          optionElem.text = option.text
          this.elements.input.appendChild(optionElem)
        }
      }
    }
  }

  window.customElements.define("s4s-input", S4SInput)
})(window, document, window.s4s)
