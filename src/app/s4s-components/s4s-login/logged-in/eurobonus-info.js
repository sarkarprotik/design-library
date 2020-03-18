class S4SLoggedInEurobonus extends S4SLoggedInBusiness {
  constructor() {
    super()
  }

  addEurobonusInfo() {
    const tags = [this.createTag(this.data.euroBonus.currentTierCode, this.data.euroBonus.currentTierName)]
    if (this.data.euroBonus.lifeTimeGold) {
      tags.push(this.createTag("G", "Lifetime Gold"))
    }
    const info = this.addPrivateInfo()
    const travelPass = this.createTravelPass(this.data.engagements.travelPass)
    this.appendChildren(this.privateState, [...tags, ...info, travelPass])
  }

  addPrivateInfo() {
    return [this.createEurobonusinfo(), this.createLink(this.content.loggedIn.eurobonus)]
  }

  createEurobonusinfo() {
    const info = this.createElement("div", { classes: ["info-block"] })
    const pointsHeading = this.createElement("h2", {
      classes: ["h4"],
      innerText: this.content.loggedIn.eurobonusPoints
    })

    const expirationHeading = this.createElement("h2", {
      classes: ["h4"],
      innerText: this.content.loggedIn.expiringPoints
    })

    const points = this.createElement("p", {
      innerText: spaceAtThousand(this.data.euroBonus.totalPointsForUse)
    })

    const eurobonusExpire = this.createEurobonusExpire()

    this.appendChildren(info, [pointsHeading, points, expirationHeading, eurobonusExpire])
    return info
  }

  createEurobonusExpire() {
    const eurobonusExpire = this.findSoonestToBeExpired(this.data.euroBonus.awardPointsExpiry)
    const soonestEurobonusToExpire = document.createElement("template")
    soonestEurobonusToExpire.innerHTML = `<p>${spaceAtThousand(eurobonusExpire.points)} (<span>${
      eurobonusExpire.formattedDate
    }</span>)</p>`

    if (this.expiresInAMonth(eurobonusExpire.expiryDate)) {
      soonestEurobonusToExpire.content.querySelector("span").classList.add("color-r")
    }
    return document.importNode(soonestEurobonusToExpire.content, true)
  }

  findSoonestToBeExpired(eurobonuses) {
    return eurobonuses.reduce(
      (min, eb) => (Date.parse(eb.expiryDate) < Date.parse(min.expiryDate) ? eb : min),
      eurobonuses[0]
    )
  }

  expiresInAMonth(date) {
    const month = 1000 * 60 * 60 * 24 * 30
    return Date.parse(date) - Date.now() <= month
  }
}
