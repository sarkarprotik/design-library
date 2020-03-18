;(function(window, document, s4s) {
  class S4SCombobox extends S4SInputBase {
    constructor() {
      super()

      this.data = {}
      this.lastFilteredValue = ""
      this.selectedListItem = null
    }

    connectedCallback() {
      this.init(s4s.templates.comboBox)
      this.prepare()
      this.createTooltip()
      this.addFocusAndBlurEvents(this.elements.input)
      this.getData()
      this.bindEvents()
    }

    getData() {
      this.httpRequest(`/assets/data/cepdata_${this.market}.json`, {}, (data) => {
        data.json().then(data => this.data = data)
      })
    }

    bindEvents() {
      this.elements.input.addEventListener("keydown", event => {
        if ([this.keyCodes.ARROW_DOWN].indexOf(event.keyCode) > -1) {
          this.selectedListItem = this.selectedListItem ? this.selectedListItem.nextElementSibling : this.elements.listbox.children[0]
          this.markListItem()
        } else if ([this.keyCodes.ARROW_UP].indexOf(event.keyCode) > -1) {
          this.selectedListItem = this.selectedListItem ? this.selectedListItem.previousElementSibling : this.elements.listbox.children[this.elements.listbox.children.length - 1]
          this.markListItem()
        } else if ([this.keyCodes.ENTER, this.keyCodes.TAB].indexOf(event.keyCode) > -1) {
          event.stopPropagation()
          this.selectListItem()
          this.hideItems()
          return
        }
      })

      this.elements.input.addEventListener("keyup", event => {
        event.preventDefault()

        const value = event.target.value.trim()
        if (this.lastFilteredValue !== value) {
          this.filter(value)
          this.selectedListItem = this.elements.listbox.children[0]
          this.markListItem()
        }
        this.lastFilteredValue = value
      })

      let timer = null
      const self = this
      this.elements.input.addEventListener("blur", event => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          self.elements.listbox.setAttribute("hidden", true)
        }, 200)
      })

      this.elements.listbox.addEventListener("click", event => {
        event.preventDefault()
        this.selectedListItem = this.getParentElement(event.target, "li")
        this.selectListItem()
        this.hideItems()
      })
    }

    hideItems() {
      this.elements.listbox.innerHTML = ""
      this.elements.listbox.setAttribute("hidden", true)
      this.lastFilteredValue = ""
      this.selectedListItem = null
    }

    selectListItem() {
      if (this.selectedListItem) {
        this.json = this.selectedListItem.data
        this.elements.input.value = this.selectedListItemText
      }
    }

    markListItem() {
      if (this.selectedListItem) {
        const prevListItem = this.selectedListItem.previousElementSibling
        if (prevListItem) {
          prevListItem.classList.remove("key-active")
        }
        const nextListItem = this.selectedListItem.nextElementSibling
        if (nextListItem) {
          nextListItem.classList.remove("key-active")
        }
        this.selectedListItem.classList.add("key-active")
        this.selectedListItem.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }

    filter(value) {
      if (value.length < 2) {
        this.hideItems()
        return
      }
      const filteredItems = []
      const items = this.data.countries
      for (let i = 0; i < items.length; i++) {
        const country = items[i]
        const isCountryMatch = (country.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
        for (let j = 0; j < country.cities.length; j++) {
          const city = country.cities[j]
          const isCityMatch = isCountryMatch || (city.name.toLowerCase().indexOf(value.toLowerCase()) > -1)

          for (let k = 0; k < city.airports.length; k++) {
            const airport = city.airports[k]
            const isAirportMatch = isCountryMatch || isCityMatch || (airport.name.toLowerCase().indexOf(value.toLowerCase()) > -1)

            if (isAirportMatch) {
              filteredItems.push({country: country.name, city: city.name, airport: { code: airport.code, name: airport.name }})
            }
          }
        }
      }
      this.addFilteredItems(filteredItems)
      this.elements.listbox.removeAttribute("hidden")
    }

    addFilteredItems(items) {
      let templateElem
      this.elements.listbox.innerHTML = ""
      for (let i = 0; i < items.length; i++) {
        const listItem = this.appendTemplate(s4s.templates.comboBoxListItem, this.elements.listbox)
        this.setElements(listItem)
        listItem.data = items[i]
        listItem.elements.country.innerText = listItem.data.country
        listItem.elements.cityAirport.innerText = `${listItem.data.city} - ${listItem.data.airport.name}`
        listItem.elements.airportCode.innerText = listItem.data.airport.code
      }
    }

    static get observedAttributes() {
      return ["options"]
    }

    attributeChangedCallback() {}

    get market() {
      return this.getAttribute("market") || "se-sv"
    }

    get selectedListItemText() {
      return `${this.selectedListItem.data.city} ${this.selectedListItem.data.airport.code}`
    }
  }

  window.customElements.define("s4s-combobox", S4SCombobox)
})(window, document, window.s4s)
