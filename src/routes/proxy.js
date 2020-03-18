const router = require("koa-router")()
const sharp = require("sharp")
const request = require("request-promise-native").defaults({ headers: { "X-Application": "design-library" } })
const common = require("../helpers/common")
const scope = process.env.SCOPE
const responseMaxAge = scope === "prod" ? 900 : 30

router.get("/(misc|etc|home|libs|labs|content|cms|translations|appdata)/(.*)", async (ctx, next) => {
  return await request({uri: `https://www.sas.se${ctx.url}`, resolveWithFullResponse: true, encoding: null}).then(response => {
    ctx.set("Content-Type", response.headers["content-type"])
    ctx.acceptsEncodings(["gzip", "deflate", "identity"])
    ctx.body = response.body
  })
})

router.get("(/v2/de-design-library)?/assets/icons/raw/:name", async (ctx, next) => {
  let contentType = "image/svg+xml"
  let fileName = ctx.params.name
  let filePath = `./build/icons/raw/${fileName}.svg`
  let fileExists = true
  if (ctx.query.format === "png") {
    let svgData = await common.readFilePromise(filePath)
    ctx.type = "image/png"
    ctx.acceptsEncodings(["gzip", "deflate", "identity"])
    ctx.set("Cache-Control", `max-age=${responseMaxAge}`)
    if (ctx.query.color) {
      svgData = svgData.replace(/fill-rule/gi, `fill="#${ctx.query.color}" fill-rule`)
    }
    return sharp(Buffer.from(svgData))
      .png()
      .toBuffer()
      .then(img => {
        ctx.body = img
      })
  } else if (fileName.match(/^(x--)/gi)) {
    filePath = `./build/icons-other/png/${fileName.replace(/x--/gi, "")}.png`
    ctx.type = "image/png"
    ctx.acceptsEncodings(["gzip", "deflate", "identity"])
    ctx.set("Cache-Control", `max-age=${responseMaxAge}`)
    return sharp(filePath)
      .resize(150, 100, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer()
      .then(img => {
        ctx.body = img
      })
    //return ctx.body = common.createReadStream(filePath)
  } else if (fileName.match(/^(p--|b--|logo--|car--|flag--)/gi)) {
    filePath = `./build/icons-extra/raw/${fileName}.svg`
  } else if (!fileName.match(/^(cl--|in--)/gi)) {
    fileName = `cl--${ctx.params.name}`
    filePath = `./build/icons/raw/${fileName}.svg`
    fileExists = await common.isFileReadablePromise(filePath)
    if (!fileExists) {
      fileName = `in--${ctx.params.name}`
      filePath = `./build/icons/raw/${fileName}.svg`
      fileExists = await common.isFileReadablePromise(filePath)
    }
    if (!fileExists) {
      fileName = `p--${ctx.params.name}`
      filePath = `./build/icons-extra/raw/${fileName}.svg`
    }
  }
  let data = await common.readFilePromise(filePath)
  ctx.type = contentType
  if (ctx.query.color) {
    if (data.indexOf("currentColor") > -1) {
      data = data.replace(/currentColor/gi, `#${ctx.query.color}`)
    } else {
      data = data.replace(/fill-rule/gi, `fill="#${ctx.query.color}" fill-rule`)
    }
  }

  ctx.acceptsEncodings(["gzip", "deflate", "identity"])
  ctx.set("Cache-Control", `max-age=${responseMaxAge}`)
  return ctx.body = data
})

module.exports = router
