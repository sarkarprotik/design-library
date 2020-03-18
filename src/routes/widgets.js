const router = require("koa-router")()
const config = require("../../config")
const common = require("../helpers/common")
const request = require("../services/request")
const i18n = require("../../i18n/i18n")

router.get("/widgets/sas-main-header/:market", async (ctx, next) => {
  const market = ctx.params.market.replace(/^en$/gi, config.defaultMarket) || config.defaultMarket

  if (config.markets.indexOf(market) === -1) {
    return next()
  }

  const data = common.getMenu(market)
  const [widgetCss, widgetJs] = await Promise.all([
    common.readFilePromise("./build/css/components/sas-main-header/build.css"),
    common.readFilePromise("./build/js/components/sas-main-header/build.js"),
  ])

  return await ctx.render("components/sas-main-header/sas-main-header-widget", { ...config, ...data, market, widgetCss, widgetJs, layout: "/tool-ui/widget" })
})

router.get("/widgets/sas-main-footer/:market", async (ctx, next) => {
  const market = ctx.params.market.replace(/^en$/gi, config.defaultMarket) || config.defaultMarket

  if (config.markets.indexOf(market) === -1) {
    return next()
  }

  const data = require(`../data/footer_${market}`)
  const [widgetCss, widgetJs] = await Promise.all([
    common.readFilePromise("./build/css/components/sas-main-footer/widget.css"),
    common.readFilePromise("./build/js/components/sas-main-footer/build.js"),
  ])

  return await ctx.render("components/sas-main-footer/sas-main-footer-widget", { ...config, ...data, market, widgetCss, widgetJs, layout: "/tool-ui/widget" })
})

router.get("/widgets/sas-spin-number", async (ctx, next) => {
  const [widgetCss, widgetJs] = await Promise.all([
    common.readFilePromise("./build/css/components/sas-spin-number/build.css"),
    common.readFilePromise("./build/js/components/sas-spin-number/build.js"),
  ])

  return await ctx.render("components/sas-spin-number/sas-spin-number-widget", { ...config, widgetCss, widgetJs, layout: "/tool-ui/widget" })
})

router.get("/widgets/modals", async (ctx, next) => {
  const [widgetCss, widgetJs] = await Promise.all([
    common.readFilePromise("./build/css/components/modals/build.css"),
    common.readFilePromise("./build/js/components/modals/build.js"),
  ])

  return await ctx.render("components/modals/modals-widget", { ...config, widgetCss, widgetJs, layout: "/tool-ui/widget" })
})

router.get("/widgets/forms/:type/:market", async (ctx, next) => {
  let { type, market } = ctx.params

  if (["sports", "corporate"].indexOf(type) === -1) {
    return next()
  }

  market = market.replace(/^en$/gi, config.defaultMarket) || config.defaultMarket

  if (config.markets.indexOf(market) === -1) {
    return next()
  }
  
  const isNordic = (market === "se-sv" || market === "no-no" || market === "dk-da" || market === "fi-en")
  if (type === "corporate" && !isNordic) {
    formData = require(`../app/components/forms/sfb/formdata/corporate_flysas`)
  } else if (type === "corporate" && isNordic){
    formData = require(`../app/components/forms/sfb/formdata/corporate`)
  } else {
    formData = require(`../app/components/forms/sfb/formdata/${type}_${market}`)
  }
  
  formData = i18n.parseJson(market, formData)
  const [widgetCss, widgetJs] = await Promise.all([
    common.readFilePromise("./build/css/components/forms/sfb/build.css"),
    common.readFilePromise("./build/js/components/forms/sfb/build.js"),
  ])

  return await ctx.render("components/forms/sfb/widget", { ...config, sasForm: formData.sasForm, widgetCss, widgetJs, layout: "/tool-ui/widget" })
})

router.get("/widgets/forms/:type/test", async (ctx, next) => {
  const { type } = ctx.params
  if (["sports", "corporate"].indexOf(type) === -1) {
    return next()
  }

  return await ctx.render("components/forms/sfb/test", { ...config, type, layout: "/tool-ui/empty" })
})

router.post("/widgets/forms/:type", async (ctx, next) => {
  const { type } = ctx.params
  if (["sports", "corporate"].indexOf(type) === -1) {
    return next()
  }

  let postData = ctx.request.body
  let apiUrl = "/corporate/sport/enrollment"
  if (type === "corporate") {
    apiUrl = "/corporate/company/enrollment"
  }

  const options = {
    method: "POST",
    url: apiUrl,
    auth: true,
    body: postData,
  }
  const response = await request.getUrl(options)

  return ctx.body = response
})

router.get("/widgets/destination-map", async (ctx, next) => {
  const countries = require("../app/components/destination-map/countries")

  let [widgetCss] = await Promise.all([
    common.readFilePromise("./build/css/components/destination-map/build.css"),
  ])

  return await ctx.render("components/destination-map/destination-map", { ...config, countries, widgetCss, layout: "/tool-ui/empty" })
})

router.get("/widgets/sas-input-test", async (ctx, next) => {
  return await ctx.render("components/forms/test/web-component", { ...config, layout: "/tool-ui/empty" })
})

module.exports = router
