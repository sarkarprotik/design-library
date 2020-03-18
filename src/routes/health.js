const os = require("os")
const router = require("koa-router")()
const readiness = require("../helpers/readiness")

router.get("/stats", async (ctx, next) => {
  const uptimeInSec = process.uptime()
  const gigaByte = (1 / (Math.pow(1024, 3)))
  const megaByte = (1 / (Math.pow(1024, 2)))

  const data = {
    env: process.env.NODE_ENV || "nodejs env not set",
    scope: process.env.SCOPE,
    hostname: os.hostname(),
    uptime: Math.floor(uptimeInSec / 60 / 60 / 24) + "d " + Math.floor(uptimeInSec / 60 / 60 % 24) + "h " + Math.floor(uptimeInSec / 60 % 60) + "min " + Math.floor(uptimeInSec % 60) + "sec",
    cpus: os.cpus().length,
    totalmem: Number((os.totalmem() * gigaByte).toFixed(1)) + " gb",
    freemem: Number((os.freemem() * gigaByte).toFixed(2)) + " gb",
    consumedmem: Number((100 * (1 - os.freemem() / os.totalmem())).toFixed(1)) + "%",
    rss: (process.memoryUsage().rss * megaByte).toFixed(2) + " mb",
    heapTotal: (process.memoryUsage().heapTotal * megaByte).toFixed(2) + " mb",
    heapUsed: (process.memoryUsage().heapUsed * megaByte).toFixed(2) + " mb",
    external: (process.memoryUsage().external * megaByte).toFixed(2) + " mb",
    platform: os.platform(),
    release: os.release(),
  }

  ctx.body = data
  return next()
})

router.get("/readiness", async (ctx, next) => {
  if (readiness.get()) {
    return ctx.body = "OK"
  }
  return next()
})

module.exports = router
