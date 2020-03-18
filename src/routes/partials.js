const config = require("../../config")
const router = require("koa-router")()
const common = require("../helpers/common")

router.get("/partials/icons", async (ctx, next) => {
  const data = await common.getIconData()

  return await ctx.render("partials/icons/icons", { ...config, ...data, })
})

module.exports = router
