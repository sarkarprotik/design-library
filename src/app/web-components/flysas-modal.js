;(function(window, document) {
  const template = `
    <div class="flysas modal open" role="dialog" aria-modal="true" element="modal">
      <div class="modal-content">
        <h1 class="h2 modal-title" element="heading"></h1>
        <button type="button" class="btn btn-lg btn-close" data-close="true" aria-label="Close Modal" element="close">
          <svg class="sas-icon sas-icon-in--close" role="img">
            <use xlink:href="#in--close" href="#in--close"></use>
          </svg>
        </button>
        <div class="slot-content" element="content"></div>
      </div>
    </div>
  `

  class FlysasModal extends FlysasBase {
    constructor() {
      super()
      this.init(template)
      this.elements.close.addEventListener("click", event => this.setAttribute("hidden", true))

      if (this.getAttribute("heading")) {
        this.elements.heading.innerText = this.getAttribute("heading")
      } else {
        this.elements.heading.parentNode.removeChild(this.elements.heading)
      }
    }

    connectedCallback() {
      window.addEventListener("modalVisibility", data => {
        this.toggleAttribute("hidden", !data.detail)
      })
    }
  }

  window.customElements.define("flysas-modal", FlysasModal)
})(window, document)
