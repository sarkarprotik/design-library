const switcherIcon = `<s4s-icon name="cl--swap" additionalClass="right"></s4s-icon>`

class Accordion extends S4SLoggedInPrivate {
  constructor() {
    super()
  }

  createAccordion() {
    this.accordion = this.createElement("s4s-accordion", {
      attributes: { label: this.content.loggedIn.states.private.label },
      innerHTML: `<a href="/" element="switcher">${switcherIcon}${this.content.loggedIn.states.business.label}</a>`
    })
  }

  switchState() {
    this.hideAndShowState()
    this.switchAccordionLabels()
    this.accordion.toggle = false
  }

  hideAndShowState() {
    const currentSwitcherLabel = this.accordion.elements.switcher.innerText.toLowerCase()
    if (currentSwitcherLabel === this.content.loggedIn.states.business.label.toLowerCase()) {
      this.privateState.setAttribute("hidden", true)
      this.businessState.removeAttribute("hidden")
    }
    if (currentSwitcherLabel === this.content.loggedIn.states.private.label.toLowerCase()) {
      this.privateState.removeAttribute("hidden")
      this.businessState.setAttribute("hidden", true)
    }
  }

  switchAccordionLabels() {
    const tmp = this.accordion.elements.switcher.innerText
    this.accordion.elements.switcher.innerHTML = `${switcherIcon}${this.accordion.elements.label.innerText
      .toLowerCase()
      .replace("sas", "SAS")}`
    this.accordion.elements.label.innerText = tmp
  }
}
