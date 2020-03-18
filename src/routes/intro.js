const config = require("../../config")
const router = require("koa-router")()
const common = require("../helpers/common")

router.get("/", async (ctx, next) => {
  return await ctx.render("tool-ui/readme", { ...config, })
})

module.exports = router
