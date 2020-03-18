class S4SLoggedInCreate extends Accordion {
  constructor() {
    super()
  }
  addLoggedInElements(data) {
    this.data = data
    this.states = this.content.loggedIn.states
    this.wrapper.hidden = true
    const wrapper = this.createElement("div", { classes: ["s4s-login"] })

    this.appendChild(wrapper)

    if (this.isSASForBusinessMember()) {
      this.createAccordion()
      wrapper.appendChild(this.accordion)
      this.accordion.elements.switcher.addEventListener("click", event => {
        event.preventDefault()
        this.publish("LoginTogglerClicked", this.accordion.elements.switcher.innerHTML)
        this.switchState()
      })
    }

    this.createPrivateState(data)
    wrapper.appendChild(this.privateState)

    if (this.isSASForBusinessMember()) {
      this.createBusinessState(data)
      wrapper.appendChild(this.businessState)
      this.businessState.setAttribute("hidden", true)
    }
  }

  createTravelPass() {
    if ((this.data.engagements || {}).travelPass) {
      const travelPass = this.createLink(this.content.loggedIn.travelPass)
      const icon = document.createElement("s4s-icon")
      icon.setAttribute("name", "cl--new-window")
      travelPass.appendChild(icon)
      return travelPass
    }
  }

  createColoredHeading() {
    const template = document.createElement("template")
    const greetingColor = this.isEurobonusMember() ? this.data.euroBonus.currentTierCode.toLowerCase() : "b"

    template.innerHTML = `<h1 class="h2"> <span class="${`greeting greeting-${greetingColor}`}">${
      this.content.loggedIn.greeting[this.getRandomInteger(0, 7)]
    }</span> ${this.data.individual.firstName}!</h1>`

    return document.importNode(template.content, true)
  }

  getRandomInteger(min, max) {
    return Math.floor(Math.random() * max) + min
  }

  createLink({ text, href, className }) {
    const paragraph = document.createElement("p")
    const link = this.createElement("a", { classes: [className], innerText: text, attributes: { href: href } })
    paragraph.appendChild(link)
    return paragraph
  }

  createTag(tierCode, tierName) {
    return this.createElement("div", {
      classes: ["tag", "tag-" + tierCode.toLowerCase()],
      innerText: tierName
    })
  }

  isSASForBusinessMember() {
    return !!this.data.corporateMemberEngagement
  }

  isEurobonusMember() {
    return !!(this.data.engagements || {}).euroBonus
  }
}

const spaceAtThousand = str => str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")
