;(function(window, document, s4s) {
  class S4SModal extends S4SBase {
    constructor() {
      super()
    }

    connectedCallback() {
      this.init(s4s.templates.modal)
      this.elements.close.addEventListener("click", event => this.setAttribute("hidden", true))

      if (this.getAttribute("heading")) {
        this.elements.heading.innerText = this.getAttribute("heading")
      } else {
        this.elements.heading.parentNode.removeChild(this.elements.heading)
      }
      window.addEventListener("modalVisibility", data => {
        if (data.detail.id === this.getAttribute("modal-id")) {
          this.toggleAttribute("hidden", !data.detail.visible)
        }
      })
    }
  }

  window.customElements.define("s4s-modal", S4SModal)
})(window, document, window.s4s)
