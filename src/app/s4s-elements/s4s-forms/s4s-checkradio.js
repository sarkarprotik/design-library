;(function(window, document) {
  const template = document.createElement("template")
  template.innerHTML = `
    <fieldset>
      <legend></legend>
    </fieldset>
  `

  const checkRadioTemplate = document.createElement("template")
  checkRadioTemplate.innerHTML = `
    <div class="check-radio"><input> <label></label></div>
  `

  class sasFieldset extends HTMLElement {
    constructor() {
      super()
    }

    connectedCallback() {
      console.log("connectedCallback")

      this.connected = true
      this.valid = false

      this.appendChild(document.importNode(template.content, true))
      this.wrapperElem = this.querySelector("fieldset")
      this.legendElem = this.querySelector("legend")

      this.render()
    }

    static get observedAttributes() {
      return ["legend", "options"]
    }

    attributeChangedCallback(name, oldVal, newVal) {
      console.log("attributeChangedCallback")
      this.render()
    }

    get name() {
      return this.getAttribute("name")
    }

    get type() {
      return this.getAttribute("type")
    }

    get legend() {
      return this.getAttribute("legend")
    }

    set legend(value) {
      this.setAttribute("legend", value)
    }

    set options(value) {
      this.setAttribute("options", JSON.stringify(value))
    }

    get options() {
      return JSON.parse(this.getAttribute("options"))
    }

    render() {
      if (!this.connected) {
        return
      }

      this.legendElem.innerText = this.legend

      if (this.options) {
        for (let i = 0; i < this.options.items.length; i++) {
          const option = this.options.items[i]
          const checkElem = document.importNode(
            checkRadioTemplate.content,
            true
          )
          const name = this.type === "radio" ? this.name : `${this.name}${i}`
          checkElem.querySelector("input").value = option.value
          checkElem.querySelector("input").name = name
          checkElem.querySelector("input").id = `${this.id}${i}`
          checkElem.querySelector("input").type = this.type
          checkElem.querySelector("label").innerText = option.text
          checkElem.querySelector("label").setAttribute("for", `${this.id}${i}`)
          this.wrapperElem.appendChild(checkElem)
        }
      }
    }
  }

  window.customElements.define("flysas-fieldset", sasFieldset)
})(window, document)
