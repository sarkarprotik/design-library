;(function(window, document, s4s) {
  class S4SCustomPax extends S4SInputBase {
    constructor() {
      super()
    }

    connectedCallback() {
      this.init(s4s.templates.custom.input)
      this.addTemplates()
      this.prepare()
      this.createTooltip()
      this.addFocusAndBlurEvents(this.elements.input)
      this.bindEvents()
      this.passengers = {
        adults: Number(this.elements.adultsCount.innerText),
        children: Number(this.elements.childrenCount.innerText),
        infants: Number(this.elements.infantsCount.innerText)
      }
      this.setInputValue()
    }

    addTemplates() {
      this.appendTemplate(s4s.templates.custom.pax, this.elements.custom)
      this.setElements()
      this.setLabels()
    }

    setLabels() {
      this.elements.adults.innerText = this.adultsLabel
      this.elements.children.innerText = this.childrenLabel
      this.elements.infants.innerText = this.infantsLabel
    }

    bindEvents() {
      let timer = null
      const self = this
      this.elements.input.addEventListener("focus", event => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          self.elements.custom.removeAttribute("hidden")
        }, 200)
      })

      this.elements.input.addEventListener("blur", event => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          self.elements.custom.setAttribute("hidden", true)
        }, 200)
      })

      this.elements.pax.addEventListener("click", event => {
        event.preventDefault()
        clearTimeout(timer)

        if (!event.target || !event.target.getAttribute("data-inc")) {
          return
        }

        const type = event.target.getAttribute("data-type")
        const min = Number(this.elements[type].getAttribute("data-min"))
        const value = this.passengers[type] + Number(event.target.getAttribute("data-inc"))
        let isValid = value >= min
        if (type === "infants") {
          isValid = isValid && value <= this.passengers["adults"]
        } else if (type === "adults") {
          isValid = isValid && this.passengers["children"] + value <= 9
        } else if (type === "children") {
          isValid = isValid && this.passengers["adults"] + value <= 9
        }
        if (!isValid) {
          return
        }
        this.passengers[type] = value
        this.elements[`${type}Count`].innerText = this.passengers[type]
        this.setInputValue()
      })

      this.subscribe("sasInputFocused", data => {
        if (data.detail !== this.elements.input) {
          this.elements.custom.setAttribute("hidden", true)
        }
      })
    }

    setInputValue() {
      this.elements.input.value = `${this.totalPax} ${this.passengerLabel}`
      this.classList.add("focused")
    }

    static get observedAttributes() {
      return []
    }

    attributeChangedCallback() {}

    get market() {
      return this.getAttribute("market") || "se-sv"
    }

    get adultsLabel() {
      return this.getAttribute("adults-label") || ""
    }

    get childrenLabel() {
      return this.getAttribute("children-label") || ""
    }

    get infantsLabel() {
      return this.getAttribute("infants-label") || ""
    }

    get passengerLabel() {
      return this.getAttribute("passenger-label") || ""
    }

    get totalPax() {
      let total = 0
      for (const prop in this.passengers) {
        total += this.passengers[prop]
      }
      return total
    }
  }

  window.customElements.define("s4s-custom-pax", S4SCustomPax)
})(window, document, window.s4s)
