;(function(window, document, s4s) {
  class S4SCep extends S4SBase {
    constructor() {
      super()
    }

    connectedCallback() {
      this.init(s4s.templates.cep)
      this.bindEvents()
    }

    bindEvents() {
      this.elements.form.addEventListener("submit", event => this.search(event))
    }

    search(event) {
      event.preventDefault()
      console.log(this.elements.from.json)
      const upsellUrl = `https://www.sas.se/book/flights?search=RT_ARN-GOT-20200401-20200408_a1c0i0y0&view=upsell&bookingFlow=revenue&sortBy=stop,stop`
    }
  }

  window.customElements.define("s4s-cep", S4SCep)
})(window, document, window.s4s)
