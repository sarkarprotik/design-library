const config = require("../../config")
const router = require("koa-router")()
const common = require("../helpers/common")

function getColorData(colors) {
  const colorsData = colors.split("\n").map(line => {
    const name = ((line.match(/\$[^-]+/gi) || [])[0] || "").replace(/[$-]/gi, "")
    const hex = ((line.match(/\#.+$/gi) || [])[0] || "").replace(/[;]/gi, "")
    const isDark = line.match(/-dark-/gi) ? true : false
    const isLight = line.match(/-light-/gi) ? true : false

    return {
      name,
      hex,
      isDark,
      isLight,
    }
  })

  colorsData.forEach(color => {
    if (color.isDark) {
      const item = colorsData.find(c => c.name === color.name)
      item.dark = color
    }
    if (color.isLight) {
      const item = colorsData.find(c => c.name === color.name)
      item.light = color
    }
  })

  return colorsData.filter(c => (!c.isDark && c.name)&&(!c.isLight && c.name))
}

router.get("/styleguide/colors", async (ctx, next) => {
  const data = {}

  const [primary, support, accent] = await Promise.all([
    common.readFilePromise("./src/app/styleguide/colors/primary.scss"),
    common.readFilePromise("./src/app/styleguide/colors/support.scss"),
    common.readFilePromise("./src/app/styleguide/colors/accent.scss"),
  ])

  data.primary = getColorData(primary)
  data.support = getColorData(support)
  data.accent = getColorData(accent)

  return await ctx.render("styleguide/colors/colors", { ...config, ...data })
})

module.exports = router
