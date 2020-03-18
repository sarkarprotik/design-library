const router = require("koa-router")()
const config = require("../../config")
const common = require("../helpers/common")
const profile = require("../helpers/profile")
const request = require("../services/request")
const i18n = require("../../i18n/i18n")
const s4sLogin = require("../app/s4s-components/s4s-login/content.json")
const getProfileMockData = require("../app/s4s-components/s4s-login/get-profile.json")
const getEurobonusMockData = require("../app/s4s-components/s4s-login/eurobonus.json")

router.get("/s4s-components/test", async (ctx, next) => {
  return await ctx.render("s4s-elements/s4s-test/page", {
    ...config,
    layout: "/tool-ui/empty"
  })
})

router.get("/s4s-components/cards", async (ctx, next) => {
  return await ctx.render("s4s-elements/s4s-cards/page", {
    ...config,
    layout: "/tool-ui/empty"
  })
})

router.get("/s4s-components/accordions", async (ctx, next) => {
  return await ctx.render("s4s-elements/s4s-accordions/page", {
    ...config,
    layout: "/tool-ui/empty"
  })
})

router.get("/s4s-components/forms", async (ctx, next) => {
  return await ctx.render("s4s-elements/s4s-forms/page", {
    ...config,
    layout: "/tool-ui/empty"
  })
})

router.get("/s4s-components/cep", async (ctx, next) => {
  return await ctx.render("s4s-components/s4s-cep/page", {
    ...config,
    layout: "/tool-ui/empty"
  })
})

router.get("/s4s-components/content.json", async ctx => {
  ctx.body = s4sLogin
})

router.post("/s4s-components/get-profile", async ctx => {
  const profileData = await profile.getProfile()

  return (ctx.body = profileData)
})

router.get("/s4s-components/get-profile.json", async ctx => {
  ctx.body = getProfileMockData
})

router.get("/s4s-components/eurobonus.json", async ctx => {
  ctx.body = getEurobonusMockData
})

module.exports = router
