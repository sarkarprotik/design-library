class S4SInputBase extends S4SBase {
  constructor() {
    super()

    this.keyCodes = {
      ESC: 27,
      TAB: 9,
      ENTER: 13,
      ARROW_LEFT: 37,
      ARROW_UP: 38,
      ARROW_RIGHT: 39,
      ARROW_DOWN: 40
    }
  }

  prepare() {
    this.connected = true

    this.classList.add("sas-input")
    if (this.querySelector("ul")) {
      this.classList.add("sas-combobox")
    } else if (this.querySelector(".form-calendar")) {
      this.classList.add("sas-datepicker")
    } else if (this.querySelector(".form-custom")) {
      this.classList.add("sas-custom")
    }
    if (this.mandatory) {
      this.classList.add("mandatory")
    }

    this.setAttribute("data-name", this.name)
  }

  get value() {
    return this.elements.input.value
  }

  get label() {
    return this.getAttribute("label")
  }

  get name() {
    return this.getAttribute("name")
  }

  get id() {
    return this.getAttribute("id")
  }

  get type() {
    return this.getAttribute("type")
  }

  get validation() {
    return this.getAttribute("validation")
  }

  get message() {
    return this.getAttribute("message")
  }

  get mandatory() {
    return this.getAttribute("mandatory")
  }

  set options(value) {
    this.setAttribute("options", JSON.stringify(value))
  }

  get options() {
    return JSON.parse(this.getAttribute("options"))
  }

  get doValidation() {
    return this.validate
  }

  get infoText() {
    return this.getAttribute("infoText")
  }

  createTooltip() {
    if (this.infoText) {
      const icon = document.createElement("s4s-icon")
      icon.setAttribute("name", "cl--alert-circle")
      icon.setAttribute("additionalClass", "form-field-icon")
      icon.setAttribute("text", this.infoText)
      this.elements.formField.appendChild(icon)

      const toolTip = document.createElement("div")
      toolTip.innerText = this.infoText
      toolTip.classList.add("form-tooltip", "sas-tooltip", "hidden")
      icon.addEventListener("click", function() {
        toolTip.classList.toggle("hidden")
      })
      this.elements.formField.appendChild(toolTip)
    }
  }

  validate() {
    const elementValue = this.elements.input.value
    const hasInvalidValue = this.validation && !new RegExp(this.validation, "gi").test(elementValue)
    this.valid = !hasInvalidValue
    this.classList.toggle("invalid", hasInvalidValue)
    return this.valid
  }

  addFocusAndBlurEvents(elem) {
    elem.addEventListener("focus", event => {
      this.classList.add("focused")
      this.publish("sasInputFocused", event.target)
    })

    elem.addEventListener("blur", event => {
      this.validate()
      if (!elem.value) {
        this.classList.remove("focused")
      }
    })
  }
}
