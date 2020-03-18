const request = require("request-promise-native").defaults({ headers: { "X-Application": "design-library" } })
const config = require("../config")
const baseUrl = "https://www.flysas.com"
const dictUrls = [
  "/translations/customer-lib/customer_[languagecode].json",
  "/libs/cq/i18n/dict.[languagecode].json"

]
const marketConfigs = {}

async function fetch(props) {
  if (process.env.SCOPE === "xdev") {
    return JSON.stringify(require("../src/data/dict.sv.json"))
  }

  return await request({uri: props.url})
}

async function fetchTranslation(market, urls) {
  const [code, lang] = market.split("-")

  if (lang === "en" && code !== "lu") {
    return
  }

  const dictDataArr = await Promise.all(urls.map(async url => {
    url = url
    .replace("[countrycode]", code)
    .replace("[languagecode]", lang)

    const props = {
      url: `${baseUrl}${url}`,
    }

    const dictData = await fetch(props)
    return JSON.parse(dictData)
  }))

  marketConfigs[market] = marketConfigs[market] || {}
  marketConfigs[market].dict = Object.assign({}, ...dictDataArr)
}

function parseJson(market, json) {
  const translatedString = JSON.stringify(json).replace(/\{i18n [^\}]+\}/gi, group => {
    const i18nKey = group.replace(/\{i18n(.+)[\}]/gi, "$1").trim()
    return getTranslation(market, i18nKey)
  })
  return JSON.parse(translatedString)
}

function getTranslation(market, key) {
  const translation = (marketConfigs[market] || marketConfigs["lu-en"]).dict[key]
  // refactor market code with hbshelper
  if (translation){
    return translation.trim()
  } else if (!translation && key === "marketCode") {
    return market
  }
  return ""
}

async function load() {
    await Promise.all(config.markets.map(m => fetchTranslation(m, dictUrls)))
}

module.exports = {
  load,
  parseJson,
  getConfigs: function() {
    return marketConfigs
  },
  getTranslation,
}
