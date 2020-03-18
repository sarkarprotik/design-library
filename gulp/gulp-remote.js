const gulp = require("gulp")
const remoteSrc = require("gulp-remote-src")
const through = require("through2")
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const rename = require("gulp-rename")
const config = require("../config")

function getCleanHref(href) {
  return href.replace(/https?:\/\/.+\.(fly)?sas\.(se|no|dk|fi|com)/gi, "")
}

function getIconIdentifier(iconElem) {
  if (!iconElem) {
    return
  }

  if (iconElem.classList.contains("menu-icon-flight-blue")) {
    return "cl--plane-up"
  } else if (iconElem.classList.contains("menu-icon-bag")) {
    return "cl--baggage-large"
  } else if (iconElem.classList.contains("menu-icon-car")) {
    return "cl--car"
  } else if (iconElem.classList.contains("menu-icon-globe")) {
    return "cl--globe"
  } else if (iconElem.classList.contains("menu-icon-at-airport")) {
    return "cl--locator"
  } else if (iconElem.classList.contains("menu-icon-onboard")) {
    return "cl--coffee"
  }
}

function fetchTopnav(market) {
  return remoteSrc(["header_ia.html"], {
    base: `https://www.flysas.com/content/flysas-${market.code}/${market.lang}/jcr%3Acontent/ipar-header/`
  })
    .pipe(
      through.obj(function(file, enc, callback) {
        const navJson = { items: [], cookie: {} }
        let html = file.contents.toString()
        const dom = new JSDOM(html)
        const nav = dom.window.document.getElementById("header-primary-nav")
        const topnavMenuItems = nav.querySelectorAll(".topnav-menuitem") || []
        const cookieBarWrapper = dom.window.document.querySelector(".cookies-info")
        const cookieBar = dom.window.document.querySelector(".cookie-content")
        const cookieBarLink = cookieBar.querySelector("a")
        cookieBarLink.href = cookieBarWrapper.getAttribute("data-link-path")
        cookieBarLink.setAttribute("aria-haspopup", "modal")
        cookieBarLink.setAttribute("data-modal", "cookie-modal")
        navJson.cookie.html = cookieBar.innerHTML
          .replace(/\n/gi, "")
          .replace(/\t/gi, "")
          .replace(/>[\s]+</gi, "><")
          .replace(/<br\/?>/gi, "</p><p>")
          .trim()

        Array.from(topnavMenuItems).forEach(mainItem => {
          const mainName = mainItem.querySelector("a").textContent
          const mainHref = mainItem.querySelector("a").href
          const isHidden = mainItem.classList.contains("hide")
          const isDivider = mainItem.classList.contains("divider")
          const mainCategories = []
          const asideItems = []

          const subMenuCategories = mainItem.querySelectorAll(".menu-drop-inner > li > ul") || []
          Array.from(subMenuCategories).forEach(categoryList => {
            const mainCategory = { icon: "", name: "", href: "", items: [] }
            Array.from(categoryList.children).forEach(categoryItem => {
              const categoryName = categoryItem.querySelector("a").textContent
              const categoryHref = categoryItem.querySelector("a").href
              const categoryIcon = getIconIdentifier(categoryItem.querySelector(".menu-image-wrap [role=presentation]"))
              if (categoryItem.getAttribute("data-categorypresent")) {
                mainCategory.icon = categoryIcon
                mainCategory.name = categoryItem.getAttribute("data-categorypresent")
                mainCategory.href = categoryHref
              } else {
                mainCategory.items.push({
                  name: categoryName,
                  href: categoryHref
                })
              }
            })
            mainCategories.push(mainCategory)
          })

          const asideNavItems = mainItem.querySelectorAll(".travel-info-nav > ul > li > a") || []
          Array.from(asideNavItems).forEach(asideItem => {
            asideItems.push({
              name: asideItem.textContent,
              href: asideItem.href
            })
          })

          navJson.items.push({
            name: mainName,
            href: mainHref,
            hidden: isHidden,
            divider: isDivider,
            categories: mainCategories.length > 0 ? mainCategories : undefined,
            aside: asideItems.length > 0 ? asideItems : undefined
          })
        })

        file.contents = Buffer.from(JSON.stringify(navJson))
        this.push(file)
        callback()
      })
    )
    .pipe(rename(`nav_${market.code}-${market.lang}.json`))
    .pipe(gulp.dest("./src/data/"))
}

function fetchMarketTopnav(market) {
  return function() {
    return fetchTopnav(market)
  }
}

function fetchFooter(market) {
  return remoteSrc(["footer_ia.html"], {
    base: `https://www.flysas.com/content/flysas-${market.code}/${market.lang}/jcr%3Acontent/ipar-footer-content/`
  })
    .pipe(
      through.obj(function(file, enc, callback) {
        const navJson = { items: [], logos: [], miscLinks: [], socialLinks: [], copyrightText: "", countries: [] }
        let html = file.contents.toString()
        const dom = new JSDOM(html)
        const footer = dom.window.document.querySelector("footer")
        const footerSections = footer.querySelectorAll("div.footer-links-IA") || []

        Array.from(footerSections).forEach(section => {
          const sectionItem = section.querySelector("h3 a")
          const sectionName = sectionItem.textContent
          const sectionHref = sectionItem.href
          const sectionLinks = []

          const sectionSubItems = section.querySelectorAll("ul.footer-links-ia a") || []
          Array.from(sectionSubItems).forEach(subItem => {
            const linkName = subItem.textContent
            const linkHref = subItem.href
            sectionLinks.push({
              name: linkName,
              href: getCleanHref(linkHref)
            })
          })

          navJson.items.push({
            name: sectionName,
            href: getCleanHref(sectionHref),
            links: sectionLinks
          })
        })

        const paymentLogos = footer.querySelectorAll("div.cms-logos img") || []
        Array.from(paymentLogos).forEach(logo => {
          navJson.logos.push({
            id: logo.src.match(/(p|x)--(.+)/)[2].replace("-secondary", "")
          })
        })

        const miscLinks = footer.querySelectorAll(".mob-border-footer li") || []
        Array.from(miscLinks).forEach(listItem => {
          const link = listItem.querySelector("a")
          navJson.miscLinks.push({
            id: listItem.id,
            href: getCleanHref(link.getAttribute("href")),
            text: link.textContent
          })
        })

        const socialLinks = footer.querySelectorAll(".social-networks > a") || []
        Array.from(socialLinks).forEach(link => {
          navJson.socialLinks.push({
            href: getCleanHref(link.getAttribute("href")),
            text: link.title,
            id: link.title.toLowerCase()
          })
        })

        const copyrightElem = footer.querySelector(".copyrights-footer .text p")
        navJson.copyrightText = copyrightElem ? copyrightElem.textContent.trim() : ""

        const marketInfoElem = footer.querySelector("[data-market-info]")
        const countries = JSON.parse(marketInfoElem.getAttribute("data-market-info"))
        const sites = Object.values(countries.sites)

        navJson.countries = sites.map(site => {
          return {
            countryCode: site.countryCode.toLowerCase(),
            countryName: site.countryName,
            languages: site.languages,
            origins: site.origins
          }
        })

        file.contents = Buffer.from(JSON.stringify(navJson))
        this.push(file)
        callback()
      })
    )
    .pipe(rename(`footer_${market.code}-${market.lang}.json`))
    .pipe(gulp.dest("./src/data/"))
}

function fetchMarketFooter(market) {
  return function() {
    return fetchFooter(market)
  }
}

function getBaseUrl(market) {
  if (["se", "no", "dk", "fi"].indexOf(market.code) > -1) {
    return `https://www.sas.${market.code}${
      market.lang === "en" ? "/en" : ""
    }/misc/terms-and-conditions/cookie-policy.content.html`
  }
  return `https://www.flysas.com/${market.code}-${market.lang}/misc/terms-and-conditions/cookie-policy.content.html`
}

function fetchCookiePolicy(market) {
  return remoteSrc(["cookie-policy.content.html"], {
    base: `${getBaseUrl(market)}/misc/terms-and-conditions/`
  })
    .pipe(
      through.obj(function(file, enc, callback) {
        const cookieJson = { html: [] }
        let html = file.contents.toString()
        const dom = new JSDOM(html)
        const pageWrapper = dom.window.document.querySelector(".cms-infopage-wrapper")
        cookieJson.html = pageWrapper.innerHTML
          .replace(/\n/gi, "")
          .replace(/\t/gi, "")
          .replace(/>[\s]+</gi, "><")
          .trim()

        file.contents = Buffer.from(JSON.stringify(cookieJson))
        this.push(file)
        callback()
      })
    )
    .pipe(rename(`cookie_${market.code}-${market.lang}.json`))
    .pipe(gulp.dest("./src/data/"))
}

function fetchMarketCookiePolicy(market) {
  return function() {
    return fetchCookiePolicy(market)
  }
}

function fetchCustomerScript(callback) {
  return remoteSrc(["Customer.min.js"], {
    base: `https://test.sas.se/appdata/customer-publisher/lib/`
  })
    .pipe(rename("customer.min.js"))
    .pipe(gulp.dest("./src/app/assets/vendor/customer-lib/"))
  callback()
}

function fetchCepData(market) {
  return remoteSrc([`RD_Cepdata_${market.code}.json`], {
    base: "https://www.flysas.com/appdata/cep/"
  })
    .pipe(
      through.obj(function(file, enc, callback) {
        const cepData = {}
        const fileData = JSON.parse(file.contents.toString())
        //cepData.destinations = getFlattenedDestinations(market, fileData)
        cepData.countries = getStructuredDestinations(market, fileData)

        file.contents = Buffer.from(JSON.stringify(cepData))
        this.push(file)
        callback()
      })
    )
    .pipe(rename(`cepdata_${market.code}-${market.lang}.json`))
    .pipe(gulp.dest("./src/data/"))
}

function getStructuredDestinations(market, cepdata) {
  const marketLang = market.lang
  const regions = cepdata.regiondata ? cepdata.regiondata.regionPos : []
  const geo = { countries: [] }

  regions.forEach(regionItem => {
    const regionName = regionItem.code || regionItem.names.en
    regionItem.country.forEach(countryItem => {
      if (!geo.countries.find(c => c.code === countryItem.code)) {
        const countryCode = countryItem.code
        const countryName = countryItem.names[marketLang] || countryItem.names.en
        const geoCountryItem = {
          code: countryCode,
          name: countryName,
          cities: []
        }
        countryItem.city.forEach(cityItem => {
          const cityCode = cityItem.code
          const cityName = cityItem.names[marketLang] || cityItem.names.en
          const geoCityItem = {
            code: cityCode,
            name: cityName,
            airports: []
          }
          cityItem.airport.forEach(airportItem => {
            const airportCode = airportItem.code
            const airportName = airportItem.names[marketLang] || airportItem.names.en
            const geoAirportItem = {
              code: airportCode,
              name: airportName
            }
            geoCityItem.airports.push(geoAirportItem)
          })
          geoCityItem.airports = geoCityItem.airports.sort(sortByName)
          geoCountryItem.cities.push(geoCityItem)
        })
        geoCountryItem.cities = geoCountryItem.cities.sort(sortByName)
        geo.countries.push(geoCountryItem)
      }
    })
    geo.countries = geo.countries.sort(sortByName)
  })

  return geo.countries
}

function sortByName(a, b) {
  if (a.name < b.name) {
    return -1
  } else if (a.name > b.name) {
    return 1
  }
  return 0
}

function getFlattenedDestinations(market, cepdata) {
  const marketLang = market.lang
  const regions = cepdata.regiondata ? cepdata.regiondata.regionPos : []

  function flatten() {
    const flattenedDestinations = []

    regions.forEach(regionItem => {
      const regionName = regionItem.code || regionItem.names.en
      regionItem.country.forEach(countryItem => {
        const countryCode = countryItem.code
        const countryName = countryItem.names[marketLang] || countryItem.names.en
        countryItem.city.forEach(cityItem => {
          const cityCode = cityItem.code
          const cityName = cityItem.names[marketLang] || cityItem.names.en
          cityItem.airport.forEach(airportItem => {
            const airportCode = airportItem.code
            const airportName = airportItem.names[marketLang] || airportItem.names.en
            if (!flattenedDestinations.find(a => a.airportCode === airportCode)) {
              flattenedDestinations.push({
                regionName,
                countryCode,
                countryName,
                cityCode,
                cityName,
                airportCode,
                airportName
              })
            }
          })
        })
      })
    })

    return flattenedDestinations
  }

  return flatten().sort((a, b) => {
    if (a.cityName < b.cityName) {
      return -1
    } else if (a.cityName > b.cityName) {
      return 1
    } else if (a.countryName < b.countryName) {
      return -1
    } else if (a.countryName > b.countryName) {
      return 1
    }
    return 0
  })
}

function fetchMarketCepData(market) {
  return function() {
    return fetchCepData(market)
  }
}

module.exports = {
  series: function() {
    return gulp.parallel(
      config.markets
        .map(m => {
          return [
            fetchMarketTopnav({
              code: m.split("-")[0],
              lang: m.split("-")[1]
            }),
            fetchMarketFooter({
              code: m.split("-")[0],
              lang: m.split("-")[1]
            }),
            fetchMarketCookiePolicy({
              code: m.split("-")[0],
              lang: m.split("-")[1]
            }),
            fetchMarketCepData({
              code: m.split("-")[0],
              lang: m.split("-")[1]
            })
          ]
        })
        .concat(fetchCustomerScript)
    )
  }
}
