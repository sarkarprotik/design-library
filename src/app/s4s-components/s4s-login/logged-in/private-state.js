class S4SLoggedInPrivate extends S4SLoggedInEurobonus {
  constructor() {
    super()
  }

  createPrivateState() {
    this.privateState = document.createElement("div")

    const header = this.createColoredHeading(this.data)
    this.privateState.appendChild(header)
    if (this.isEurobonusMember()) {
      this.addEurobonusInfo()
    }

    const settings = this.createLink(this.content.loggedIn.settings)
    const logout = this.createLink(this.content.loggedIn.logOut)

    this.appendChildren(this.privateState, [settings, logout])
  }
}
