require("dotenv").config()
const Koa = require("koa")
const app = new Koa()
const compress = require("koa-compress")
const cors = require("koa-cors")
const hbs = require("koa-hbs")
const static = require("koa-static")
const mount = require("koa-mount")
const convert = require("koa-convert")
const bodyParser = require("koa-bodyparser")
const config = require("./config")
const i18n = require("./i18n/i18n")
const i18nHbsHelpers = require("./i18n/hbs-helpers")
const readiness = require("./src/helpers/readiness")
const helpers = require("handlebars-helpers")({
  handlebars: hbs
})
const portNumber = process.env.SERVICE_PORT || 3000

i18nHbsHelpers.register()

async function start() {
  await i18n.load()
  readiness.set(true)

  if (process.env.SCOPE === "dev") {
    console.log(`app ready on port ${portNumber}`)
  }
}

app.use(
  compress({
    threshold: 1024,
    flush: require("zlib").Z_SYNC_FLUSH
  })
)

app.use(convert(cors({ origin: "*", maxAge: 300 })))
app.use(convert(bodyParser()))

const staticProps = {
  maxage: process.env.SCOPE === "dev" ? 0 : 300,
  defer: true,
  gzip: true
}

app.use(
  hbs.middleware({
    viewPath: "./src/app",
    partialsPath: "./src/app",
    defaultLayout: "tool-ui/index"
  })
)

app.use(mount("/assets", static("./build", staticProps)))
app.use(mount(config.assetsDirectory, static("./build", staticProps)))
app.use(mount("/data", static("./src/data", staticProps)))
app.use(mount("/", static("./build/favicons", staticProps)))

app.use(mount("/node_modules/@webcomponents/webcomponentsjs", static("./node_modules/@webcomponents/webcomponentsjs/", staticProps)))
app.use(mount("/v2/de-design-library/node_modules/@webcomponents/webcomponentsjs", static("./node_modules/@webcomponents/webcomponentsjs/", staticProps)))

app.use(require("./src/routes/health").routes())
app.use(require("./src/routes/structure").routes())
app.use(require("./src/routes/intro").routes())
app.use(require("./src/routes/styleguide").routes())
app.use(require("./src/routes/partials").routes())
app.use(require("./src/routes/components").routes())
app.use(require("./src/routes/widgets").routes())
app.use(require("./src/routes/s4s-components").routes())
app.use(require("./src/routes/web-components").routes())

app.use(require("./src/routes/proxy").routes())

app.proxy = true
app.listen(portNumber, () => `Listening on PORT: ${portNumber}`)

start()
