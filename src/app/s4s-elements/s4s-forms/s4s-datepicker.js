;(function(window, document, s4s) {
  class S4SDatepicker extends S4SInputBase {
    constructor() {
      super()

      this.data = {}
    }

    connectedCallback() {
      this.init(s4s.templates.datePicker.input)
      this.prepare()
      this.createTooltip()
      this.addFocusAndBlurEvents(this.elements.input)
      this.addTemplates()
      this.bindEvents()

      this.subscribe("triptypeToggle", data => {
        this.mode = data.detail.id === "oneway" ? "single" : "double"
      })
    }

    bindEvents() {
      let timer = null
      const self = this
      this.elements.input.addEventListener("focus", event => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          self.elements.calendar.removeAttribute("hidden")
        }, 200)
      })

      this.elements.input.addEventListener("blur", event => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          self.elements.calendar.setAttribute("hidden", true)
        }, 200)
      })

      this.elements.outbound.addEventListener("click", event => this.handleCalendarClick(event, this.elements.outbound, timer))
      this.elements.inbound.addEventListener("click", event => this.handleCalendarClick(event, this.elements.inbound, timer))

      this.subscribe("sasInputFocused", data => {
        if (data.detail !== this.elements.input) {
          this.elements.calendar.setAttribute("hidden", true)
        }
      })
    }

    handleCalendarClick(event, table, timer) {
      event.preventDefault()
      event.stopPropagation()
      clearTimeout(timer)
      timer = null

      if (event.target.data) {
        if (table.selectedElem) {
          table.selectedElem.classList.remove("selected")
        }
        table.selectedElem = event.target
        table.selectedElem.classList.add("selected")
        table.selectedDate = event.target.data.iso
        this.setInputValue(true)
      } else if (event.target && event.target.className.match(/btn-(prev|next)/gi)) {
        const index = event.target.className.match(/btn-prev/gi) ? -1 : 1
        this.addMonth(table, index)
        if (table === this.elements.outbound && this.elements.inbound.index < this.elements.outbound.index) {
          this.addMonth(this.elements.inbound, index)
        } else if (table === this.elements.inbound && this.elements.inbound.index < this.elements.outbound.index) {
          this.addMonth(this.elements.outbound, index)
        }
      }
    }

    setInputValue(force) {
      const hasValidValue = !this.departureDates.match(/x/gi)

      if (force || hasValidValue) {
        this.classList.add("focused")
        this.elements.input.value = this.departureDates

        if (hasValidValue) {
          this.elements.calendar.setAttribute("hidden", true)
        }
      }
    }

    addTemplates() {
      this.appendTemplate(s4s.templates.datePicker.tablesWrap, this.elements.calendar)
      this.setElements()
      this.addTable(this.elements.outbound)
      this.addTable(this.elements.inbound)
    }

    addTable(table) {
      this.appendTemplate(s4s.templates.datePicker.table, table)
      this.setElements(table)
      this.addMonth(table)
      table.selectedDate = "xxxx-xx-xx"
    }

    addMonth(table, index) {
      table.index = table.index || 0
      table.index += index || 0
      const body = table.elements.body
      body.innerHTML = ""
      const now = new Date()
      const monthDate = new Date(now.getFullYear(), now.getMonth() + table.index, 1, 12)
      const monthIndex = monthDate.getMonth()
      const month = []
      let week = [{}, {}, {}, {}, {}, {}, {}]
      for (let i = 1; i <= 31; i++) {
        const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), i, 12)
        const dateMonth = this.getDatePart(date.getMonth() + 1)
        const dateDay = this.getDatePart(date.getDate())
        const dateIso = `${date.getFullYear()}-${dateMonth}-${dateDay}`
        const dateId = `${date.getFullYear()}${dateMonth}${dateDay}`
        if (date.getDate() !== i) {
          break;
        }

        if (date.getDay() === 0) {
          week[6].iso = dateIso
          week[6].id = dateId
          week[6].day = date.getDate()
          this.addWeek(week, body)
          week = [{}, {}, {}, {}, {}, {}, {}]
        } else {
          week[date.getDay() - 1].iso = dateIso
          week[date.getDay() - 1].id = dateId
          week[date.getDay() - 1].day = date.getDate()
        }
      }
      this.addWeek(week, body)
      table.elements.monthName.innerText = this.monthNames[monthIndex]
      table.elements.type.innerText = (table === this.elements.outbound) ? this.outboundLabel : this.inboundLabel
    }

    addWeek(week, body) {
      const row = this.appendTemplate(s4s.templates.datePicker.week, body)
      const days = row.querySelectorAll("button")
      for (let j = 0; j <= 6; j++) {
        days[j].data = week[j]
        days[j].setAttribute("data-date", week[j].dateId || 0)
        days[j].innerText = week[j].day || ""
      }
    }

    getDatePart(part) {
      return part && part.toString().length === 1 ? `0${part}` : part
    }

    static get observedAttributes() {
      return []
    }

    attributeChangedCallback() {}

    get market() {
      return this.getAttribute("market") || "se-sv"
    }

    get monthNames() {
      return (this.getAttribute("monthNames") || "").split(",")
    }

    get outboundLabel() {
      return this.getAttribute("outbound-label")
    }

    get inboundLabel() {
      return this.getAttribute("inbound-label")
    }

    get dateDelimiter() {
      return this.getAttribute("date-delimiter")
    }

    get departureDates() {
      let departureDateText = `${this.elements.outbound.selectedDate} ${this.dateDelimiter} ${this.elements.inbound.selectedDate}`
      if (this.mode === "single") {
        departureDateText = `${this.elements.outbound.selectedDate}`
      }
      return departureDateText
    }

    get mode() {
      return this.getAttribute("mode") || "double"
    }

    set mode(value) {
      this.elements.calendar.setAttribute("hidden", true)
      this.setAttribute("mode", value)

      if (value === "single") {
        this.elements.inboundWrap.setAttribute("hidden", true)
        this.setInputValue(!this.elements.outbound.selectedDate.match(/x/gi))
      } else {
        this.elements.inboundWrap.removeAttribute("hidden")
        this.setInputValue(!this.elements.outbound.selectedDate.match(/x/gi) || !this.elements.inbound.selectedDate.match(/x/gi))
      }
    }
  }

  window.customElements.define("s4s-datepicker", S4SDatepicker)
})(window, document, window.s4s)
