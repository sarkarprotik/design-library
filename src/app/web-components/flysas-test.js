;(function(window, document) {
  const template = document.createElement("template")
  template.innerHTML = `
    <h1>Hello world</h1>
  `

  class flysasTest extends HTMLElement {
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

  window.customElements.define("flysas-test", flysasTest)
})(window, document)
