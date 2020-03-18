const moment = require("moment")
const request = require("../services/request")
const config = require("../../config")

async function getProfile(body) {
  let url = `${config.mockHostUrl}${config.appPath}/s4s-components/get-profile.json`
  let profileData = await request.getUrl({ url })

  if (isEuroBonusMember(profileData)) {
    url = `${config.mockHostUrl}${config.appPath}/s4s-components/eurobonus.json?customerSessionId=${profileData.customerSessionId}`
    let eurobonusData = await request.getUrl({ url })
    eurobonusData = enrich(eurobonusData)
    profileData = {
      ...profileData,
      ...eurobonusData
    }
  }

  return flatten(profileData)
}

const isEuroBonusMember = profileData => !!((profileData.engagements || {}).euroBonus || {}).ebNumber

function enrich(eurobonusData) {
  eurobonusData.euroBonus.awardPointsExpiry.forEach(item => {
    item.formattedDate = moment(item.expiryDate)
      .locale(config.momentLanguages["se-sv"])
      .format("ll")
  })
  return eurobonusData
}

function flatten(profileData) {
  return profileData
}

module.exports = {
  getProfile
}
