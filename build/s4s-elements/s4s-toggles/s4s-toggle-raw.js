;(function(window, document, s4s) {
  class S4SToggle extends S4SBase {
    constructor() {
      super()
    }

    connectedCallback() {
      this.init(s4s.templates.toggle.wrap)
      this.addToggles()
    }

    addToggles() {
      const toggles = this.options
      for (let i = 0; i < toggles.length; i++) {
        const toggleData = toggles[i]
        const button = this.appendTemplate(s4s.templates.toggle.button, this.elements.toggleButtons)
        this.setElements(button)
        button.data = toggleData
        button.setAttribute("aria-pressed", toggleData.selected ? true : false)
        button.elements.buttonText.innerText = toggleData.name
        button.addEventListener("click", event => this.toggle(event, button))
      }
    }

    toggle(event, button) {
      event.preventDefault()
      this.reset()
      button.setAttribute("aria-pressed", true)

      this.publish("triptypeToggle", button.data)
    }

    reset() {
      const allButtons = this.elements.toggleButtons.children
      for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].setAttribute("aria-pressed", false)
      }
    }

    get options() {
      return JSON.parse(this.getAttribute("options")) || []
    }
  }

  window.customElements.define("s4s-toggle", S4SToggle)
})(window, document, window.s4s)
