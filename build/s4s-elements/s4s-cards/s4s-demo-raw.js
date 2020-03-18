;(function(window, document, s4s) {
  class S4SDemo extends S4SBase {
    constructor() {
      super()
    }

    connectedCallback() {
      this.init(s4s.templates.demo)

      this.elements.button.addEventListener("click", event => {
        event.preventDefault()
        this.publish("corporateMode", this.elements.imgInput.value)
      })
    }
  }

  window.customElements.define("s4s-demo", S4SDemo)
})(window, document, window.s4s)
