const hbs = require("koa-hbs")
const i18n = require("./i18n")

module.exports = (function() {
  function register() {
    hbs.registerHelper("i18n", function(market, key, opts) {
      market = market || "lu-en"
      return i18n.getTranslation(market, key) || `[${key}]`
    })
  }

  return {
    register,
  }
})()
