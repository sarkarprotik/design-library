;(function(window, document, s4s) {
  class S4SCard extends S4SBase {
    constructor() {
      super()
    }

    connectedCallback() {
      this.init(s4s.templates.card)

      this.subscribe("corporateMode", data => {
        console.log("Got event. Modifying image src", data.detail)
        this.elements.image.src = data.detail
      })
    }

    get src() {
      return this.getAttribute("src")
    }
  }

  window.customElements.define("s4s-card", S4SCard)
})(window, document, window.s4s)
