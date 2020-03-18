;(function(window, document, s4s) {
  class S4SAccordion extends S4SBase {
    constructor() {
      super()
    }

    connectedCallback() {
      this.init(s4s.templates.accordion)
      this.calculateContent()
      this.expanded = false
      this.elements.button.addEventListener("click", event => this.toggleMe(event))
    }

    calculateContent() {
      this.togglerHeight = this.elements.toggler.clientHeight + 2
      this.contentHeight = this.elements.content.clientHeight
      this.elements.accordion.style.height = `${this.togglerHeight}px`
      this.elements.accordion.style.opacity = 1
    }

    toggleMe(event, open) {
      this.expanded = typeof open === "undefined" ? !this.expanded : open
      this.elements.accordion.style.height = !this.expanded
        ? `${this.togglerHeight}px`
        : `${this.togglerHeight + this.contentHeight}px`
      this.elements.button.setAttribute("aria-expanded", this.expanded)
    }

    set toggle(value) {
      this.toggleMe({}, value)
    }
  }

  window.customElements.define("s4s-accordion", S4SAccordion)
})(window, document, window.s4s)
