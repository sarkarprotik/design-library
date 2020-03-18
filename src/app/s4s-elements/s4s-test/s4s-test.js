;(function(window, document) {
  const template = document.createElement("template")
  template.innerHTML = `
    <h1>Hello world</h1>
  `

  class S4STest extends HTMLElement {
    constructor() {
      super()
    }

    connectedCallback() {
      console.log("connectedCallback")

      this.connected = true

      this.appendChild(document.importNode(template.content, true))
    }

    static get observedAttributes() {
      return []
    }

    attributeChangedCallback(name, oldVal, newVal) {
      console.log("attributeChangedCallback")
    }
  }

  window.customElements.define("s4s-test", S4STest)
})(window, document)
