const router = require("koa-router")()
const config = require("../../config")
const common = require("../helpers/common")

router.get("/components/sas-main-header/:market", async (ctx, next) => {
  const market = ctx.params.market.replace(/^en$/gi, config.defaultMarket) || config.defaultMarket

  if (config.markets.indexOf(market) === -1) {
    return next()
  }

  const data = common.getMenu(market)

  return await ctx.render("components/sas-main-header/sas-main-header-test", { ...config, ...data, market, })
})

router.get("/components/sas-main-footer/:market", async (ctx, next) => {
  const market = ctx.params.market.replace(/^en$/gi, config.defaultMarket) || config.defaultMarket

  if (config.markets.indexOf(market) === -1) {
    return next()
  }

  const data = require(`../data/footer_${market}`)

  return await ctx.render("components/sas-main-footer/sas-main-footer-test", { ...config, ...data, market, })
})

router.get("/components/cards", async (ctx, next) => {
  const cardgroup = require(`../app/components/cards/cardgroup`)

  return await ctx.render("components/cards/page", { ...config, ...cardgroup, })
})

router.get("/components/sas-form", async (ctx, next) => {
  const sasForm = require(`../app/components/forms/sas-form`)

  return await ctx.render("components/forms/sas-form", { ...config, ...sasForm, })
})

module.exports = router
