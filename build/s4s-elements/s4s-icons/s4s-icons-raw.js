;(function(window, document) {
  class S4sIcon extends HTMLElement {
    constructor() {
      super()
    }

    connectedCallback() {
      const svgURI = "http://www.w3.org/2000/svg"
      const icon = document.createElementNS(svgURI, "svg")
      const path = document.createElementNS(svgURI, "use")

      const iconName = this.getAttribute("name")
      const additionalClass = this.getAttribute("additionalClass")
      if (additionalClass) {
        icon.classList.add(additionalClass)
      }

      icon.classList.add("sas-icon", "sas-icon-" + iconName)

      path.setAttribute("xlink:href", "#" + iconName)
      path.setAttribute("href", "#" + iconName)

      icon.appendChild(path)

      const iconText = this.getAttribute("text")
      if (iconText) {
        icon.setAttribute("role", "icon")
        const title = document.createElement("title")
        title.innerText = iconText
        icon.appendChild(title)
      } else {
        icon.setAttribute("role", "presentation")
      }
      this.appendChild(icon)

      this.iconName = iconName
      this.icon = icon
      this.path = path
      this.iconText = iconText
    }
  }

  window.customElements.define("s4s-icon", S4sIcon)
})(window, document)
