const request = require("request-promise-native").defaults({ json: true })
const service = request.defaults()
const config = require("../../config")
const ua = "Mozilla/5.0 (X11; Linux i686 on x86_64; rv:10.0) sasdigital"
const referer = "https://sasdigital.io"

async function getUrl(props) {
  if (!props.url.match(/https?:\/\/.+/gi)) {
    props.url = `${config.flysasApi.baseUrl}${props.url}`
  }

  const options = {
    method: props.method || "GET",
    uri: props.url,
    headers: props.headers || {},
    rejectUnauthorized: false
  }

  if (props.auth) {
    const authToken = await getToken()
    options.headers["authorization"] = authToken.access_token
  }

  if (options.method === "POST") {
    options.form = props.form
    options.body = props.body
    options.headers["Content-Type"] = "application/json"
    options.json = true
  }

  return fetch(options)
}

async function getToken() {
  const props = {
    method: "POST",
    headers: {
      authorization: "Basic U0FTLVVJOg=="
    },
    form: {
      grant_type: "client_credentials"
    },
    url: "/authorize/oauth/token"
  }

  if (!props.url.match(/https?:\/\/.+/gi)) {
    props.url = `${config.flysasApi.baseUrl}${props.url}`
  }

  const token = await fetch(props)
  console.log("token", token)

  return token
}

async function fetch(options) {
  let data

  options.headers["User-Agent"] = ua
  options.headers["Referer"] = referer
  //console.log("FETCH", options)

  data = await service(options)
    .then(response => {
      return {
        ...response,
        statusCode: 200
      }
    })
    .catch(err => {
      //console.err(err)
      return {
        statusCode: err.statusCode
      }
    })

  return data
}

module.exports = {
  getUrl
}
