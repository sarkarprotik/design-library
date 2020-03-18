const config = require("../../config")
const router = require("koa-router")()

config.data.navigation.categories.forEach(category => {
  category.items.forEach(item => {
    router.get(item.href, async (ctx, next) => {
      await ctx.render(item.view, { ...config, })
      return next()
    })
  })
})

module.exports = router
