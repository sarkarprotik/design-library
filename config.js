const siteStructure = require("./src/data/structure")
const assetsVersion = "1.0.0"
const scopes = {
  dev: {
    appPath: "",
    flysasApi: {
      baseUrl: "https://api-test.flysas.com"
    },
    mockHostUrl: "http://localhost:3000"
  },
  test: {
    appPath: "/v2/de-design-library",
    flysasApi: {
      baseUrl: "https://api-test.flysas.com"
    },
    mockHostUrl: "https://test.sas.se"
  },
  prod: {
    appPath: "/v2/de-design-library",
    flysasApi: {
      baseUrl: "https://api.flysas.com"
    },
    mockHostUrl: "https://test.sas.se"
  }
}

module.exports = {
  ...scopes[process.env.SCOPE],
  assetsVersion,
  assetsDirectory: "/v2/de-design-library/assets",
  title: "Design Library | SAS",
  metaDescription: "Design library | SAS",
  metaKeywords: "sas,design library,component library,design,web components,ux,ui",
  scope: process.env.SCOPE,
  data: {
    navigation: siteStructure
  },
  layout: "tool-ui/index",
  markets: [
    "no-no",
    "se-sv",
    "dk-da",
    "au-en",
    "be-en",
    "cn-zh",
    "fi-en",
    "fr-fr",
    "de-de",
    "hk-en",
    "ie-en",
    "it-en",
    "jp-ja",
    "nl-en",
    "pl-en",
    "ru-ru",
    "sg-en",
    "es-es",
    "ch-de",
    "ch-fr",
    "th-en",
    "gb-en",
    "us-en",
    "lu-en"
  ],
  momentLanguages: {
    "no-no": "nb",
    "se-sv": "sv",
    "dk-da": "da",
    "au-en": "en-au",
    "be-en": "en-gb",
    "cn-zh": "zh-cn",
    "fi-en": "en-gb",
    "fr-fr": "fr",
    "de-de": "de",
    "hk-en": "en",
    "ie-en": "en-ie",
    "it-en": "en-gb",
    "jp-ja": "ja",
    "nl-en": "en-gb",
    "pl-en": "en-gb",
    "ru-ru": "ru",
    "sg-en": "en-SG",
    "es-es": "es",
    "ch-de": "de-ch",
    "ch-fr": "fr-de",
    "th-en": "en",
    "gb-en": "en-gb",
    "us-en": "en-us",
    "lu-en": "en-gb"
  },
  defaultMarket: "lu-en"
}
