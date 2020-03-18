const fs = require("fs")

function formatCurrency(market, num) {
  if (!num) return

  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")
}

function formatDatePart(part) {
  return (+part < 10 ? "0" + part : part).toString()
}

function parseBoolean(value) {
  if (typeof value === "boolean") return value

  return value === "true"
}

async function isFileReadablePromise(filename) {
  return new Promise((resolve, reject) => {
    fs.access(filename, fs.constants.F_OK, err => {
      resolve(err ? false : true)
    })
  })
}

async function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        reject(err)
      } else resolve(data)
    })
  })
}

async function readDirPromise(folderpath) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderpath, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function createReadStream(filename) {
  const readStream = fs.createReadStream(filename)

  return readStream
}

async function getIconCategories(market, dirPath) {
  const categories = await readDirPromise(dirPath)
    .then(files => files.filter(f => f.match(/\.svg$/gi)))
    .then(files => {
      return files.map(f => {
        return {
          name: f.replace(/\.svg$/gi, ""),
          file: f
        }
      })
    })
    .then(files => {
      return [
        {
          name: "Clarifying",
          icons: files.filter(f => f.name.indexOf("cl--") === 0)
        },
        {
          name: "Interactive",
          icons: files.filter(f => f.name.indexOf("in--") === 0)
        },
        {
          name: "Payment",
          icons: files.filter(f => f.name.indexOf("p--") === 0)
        },
        {
          name: "Brand",
          icons: files.filter(f => f.name.indexOf("b--") === 0)
        },
        {
          name: "Flags",
          icons: files.filter(f => f.name.indexOf("flag--") === 0)
        },
        {
          name: "Other",
          icons: files.filter(f => f.name.indexOf("x--") === 0)
        }
      ]
    })

  return categories.filter(c => c.icons.length > 0)
}

async function getIconData(market) {
  const iconCategories = await getIconCategories(market, "./build/icons/raw")
  const iconExtraCategories = await getIconCategories(market, "./build/icons-extra/raw")
  const iconOtherCategories = await getIconCategories(market, "./build/icons-other/raw")
  const iconFlagsCategories = await getIconCategories(market, "./build/icons-flags/raw")

  return {
    iconCategories,
    iconExtraCategories,
    iconOtherCategories,
    iconFlagsCategories
  }
}

function getMenu(market) {
  const navData = require(`../data/nav_${market}`)

  return {
    ...navData,
    items: navData.items.map(item => {
      let cssClass = item.divider ? "divider" : ""
      cssClass += item.hidden ? " hidden" : ""

      return {
        ...item,
        cssClass: cssClass.trim()
      }
    })
  }
}

module.exports = {
  formatCurrency,
  formatDatePart,
  parseBoolean,
  isFileReadablePromise,
  readFilePromise,
  readDirPromise,
  createReadStream,
  getIconData,
  getMenu
}
