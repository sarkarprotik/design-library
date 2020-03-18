const router = require("koa-router")()
const config = require("../../config")
const common = require("../helpers/common")
const request = require("../services/request")
const i18n = require("../../i18n/i18n")

router.get("/web-components/flysas-modal", async (ctx, next) => {
  return await ctx.render("web-components/flysas-modal", {
    ...config,
    layout: "/tool-ui/empty"
  })
})

router.get("/web-components/defer", async (ctx, next) => {
  return await ctx.render("web-components/web-component", {
    ...config,
    layout: "/tool-ui/empty"
  })
})

router.get("/web-components/sync", async (ctx, next) => {
  return await ctx.render("web-components/web-component-sync", {
    ...config,
    layout: "/tool-ui/empty"
  })
})

router.get("/web-components/es5", async (ctx, next) => {
  return await ctx.render("web-components/web-component-es5", {
    ...config,
    layout: "/tool-ui/empty"
  })
})

module.exports = router
