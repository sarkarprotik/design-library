class S4SLoggedInBusiness extends S4SLoginCreate {
  constructor() {
    super()
  }

  createBusinessState() {
    this.businessState = document.createElement("div")

    const header = this.createColoredHeading()
    let tags = []
    if (this.isTravelAdmin()) {
      tags = [this.createTag("admin", "Admin")]
    }
    let info = this.addCorporateInfo()

    const travelPass = this.createTravelPass()

    const settings = this.createLink(this.content.loggedIn.settings)
    const logout = this.createLink(this.content.loggedIn.logOut)

    this.appendChildren(this.businessState, [header, ...tags, ...info, settings, travelPass, logout])
  }

  addCorporateInfo() {
    return [
      document.createElement("hr"),
      this.createLink(this.content.loggedIn.companyDetails),
      this.createLink(this.content.loggedIn.travelers)
    ]
  }

  isTravelAdmin() {
    return !!this.data.corporateMemberEngagement.corporateMember[0].isTravelAdmin
  }
}
