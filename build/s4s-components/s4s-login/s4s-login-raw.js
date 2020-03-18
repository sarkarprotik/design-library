;(function(window, document) {
  class S4SLogin extends S4SLoggedInCreate {
    constructor() {
      super()
      this.content = content
      this.httpRequest = httpRequest
    }

    connectedCallback() {
      this.addLoginElements()
    }
  }

  const isTestOrProd = /(www|test)\.(fly)?sas\.(com|se|no|dk|fi)/gi.test(location.hostname)

  const httpRequest = (endOfPath, options, callback) => {
    const url = isTestOrProd ? `/v2/de-design-library/${endOfPath}` : `/${endOfPath}`
    fetch(url, options).then(callback)
  }

  let content
  const loadContent = () => {
    if (!content) {
      httpRequest("s4s-components/content.json", {}, data =>
        data.json().then(data => {
          content = data
          window.dispatchEvent(new CustomEvent("contentLoaded"))
        })
      )
    } else {
      document.querySelector("s4s-login").removeAttribute("hidden")
    }
  }

  window.addEventListener("getProfileDone", event => {
    if (event.detail.status == 200) {
      document.querySelector("s4s-login").addLoggedInElements(event.detail.data)
    }
  })

  const opener = document.querySelectorAll(".s4s-login-opener")

  opener.forEach(function(elem) {
    elem.addEventListener("click", () => {
      window.dispatchEvent(new CustomEvent("loginOpenerClicked", {}))
    })
  })

  window.addEventListener("contentLoaded", () => {
    window.customElements.define("s4s-login", S4SLogin)
    const s4sLogin = document.querySelector("s4s-login")
    s4sLogin.toggleAttribute("hidden")
    s4sLogin.addEventListener("click", event => {
      if (event.target === s4sLogin) {
        s4sLogin.setAttribute("hidden", true)
      }
    })
  })

  window.addEventListener("loginOpenerClicked", () => {
    loadContent()
  })
})(window, document)
