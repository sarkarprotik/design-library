"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

;

(function (window, document, s4s) {
  var S4SDatepicker = /*#__PURE__*/function (_S4SInputBase) {
    _inherits(S4SDatepicker, _S4SInputBase);

    function S4SDatepicker() {
      var _this;

      _classCallCheck(this, S4SDatepicker);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(S4SDatepicker).call(this));
      _this.data = {};
      return _this;
    }

    _createClass(S4SDatepicker, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        this.init(s4s.templates.datePicker.input);
        this.prepare();
        this.createTooltip();
        this.addFocusAndBlurEvents(this.elements.input);
        this.addTemplates();
        this.bindEvents();
        this.subscribe("triptypeToggle", function (data) {
          _this2.mode = data.detail.id === "oneway" ? "single" : "double";
        });
      }
    }, {
      key: "bindEvents",
      value: function bindEvents() {
        var _this3 = this;

        var timer = null;
        var self = this;
        this.elements.input.addEventListener("focus", function (event) {
          clearTimeout(timer);
          timer = setTimeout(function () {
            self.elements.calendar.removeAttribute("hidden");
          }, 200);
        });
        this.elements.input.addEventListener("blur", function (event) {
          clearTimeout(timer);
          timer = setTimeout(function () {
            self.elements.calendar.setAttribute("hidden", true);
          }, 200);
        });
        this.elements.outbound.addEventListener("click", function (event) {
          return _this3.handleCalendarClick(event, _this3.elements.outbound, timer);
        });
        this.elements.inbound.addEventListener("click", function (event) {
          return _this3.handleCalendarClick(event, _this3.elements.inbound, timer);
        });
        this.subscribe("sasInputFocused", function (data) {
          if (data.detail !== _this3.elements.input) {
            _this3.elements.calendar.setAttribute("hidden", true);
          }
        });
      }
    }, {
      key: "handleCalendarClick",
      value: function handleCalendarClick(event, table, timer) {
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(timer);
        timer = null;

        if (event.target.data) {
          if (table.selectedElem) {
            table.selectedElem.classList.remove("selected");
          }

          table.selectedElem = event.target;
          table.selectedElem.classList.add("selected");
          table.selectedDate = event.target.data.iso;
          this.setInputValue(true);
        } else if (event.target && event.target.className.match(/btn-(prev|next)/gi)) {
          var index = event.target.className.match(/btn-prev/gi) ? -1 : 1;
          this.addMonth(table, index);

          if (table === this.elements.outbound && this.elements.inbound.index < this.elements.outbound.index) {
            this.addMonth(this.elements.inbound, index);
          } else if (table === this.elements.inbound && this.elements.inbound.index < this.elements.outbound.index) {
            this.addMonth(this.elements.outbound, index);
          }
        }
      }
    }, {
      key: "setInputValue",
      value: function setInputValue(force) {
        var hasValidValue = !this.departureDates.match(/x/gi);

        if (force || hasValidValue) {
          this.classList.add("focused");
          this.elements.input.value = this.departureDates;

          if (hasValidValue) {
            this.elements.calendar.setAttribute("hidden", true);
          }
        }
      }
    }, {
      key: "addTemplates",
      value: function addTemplates() {
        this.appendTemplate(s4s.templates.datePicker.tablesWrap, this.elements.calendar);
        this.setElements();
        this.addTable(this.elements.outbound);
        this.addTable(this.elements.inbound);
      }
    }, {
      key: "addTable",
      value: function addTable(table) {
        this.appendTemplate(s4s.templates.datePicker.table, table);
        this.setElements(table);
        this.addMonth(table);
        table.selectedDate = "xxxx-xx-xx";
      }
    }, {
      key: "addMonth",
      value: function addMonth(table, index) {
        table.index = table.index || 0;
        table.index += index || 0;
        var body = table.elements.body;
        body.innerHTML = "";
        var now = new Date();
        var monthDate = new Date(now.getFullYear(), now.getMonth() + table.index, 1, 12);
        var monthIndex = monthDate.getMonth();
        var month = [];
        var week = [{}, {}, {}, {}, {}, {}, {}];

        for (var i = 1; i <= 31; i++) {
          var date = new Date(monthDate.getFullYear(), monthDate.getMonth(), i, 12);
          var dateMonth = this.getDatePart(date.getMonth() + 1);
          var dateDay = this.getDatePart(date.getDate());
          var dateIso = "".concat(date.getFullYear(), "-").concat(dateMonth, "-").concat(dateDay);
          var dateId = "".concat(date.getFullYear()).concat(dateMonth).concat(dateDay);

          if (date.getDate() !== i) {
            break;
          }

          if (date.getDay() === 0) {
            week[6].iso = dateIso;
            week[6].id = dateId;
            week[6].day = date.getDate();
            this.addWeek(week, body);
            week = [{}, {}, {}, {}, {}, {}, {}];
          } else {
            week[date.getDay() - 1].iso = dateIso;
            week[date.getDay() - 1].id = dateId;
            week[date.getDay() - 1].day = date.getDate();
          }
        }

        this.addWeek(week, body);
        table.elements.monthName.innerText = this.monthNames[monthIndex];
        table.elements.type.innerText = table === this.elements.outbound ? this.outboundLabel : this.inboundLabel;
      }
    }, {
      key: "addWeek",
      value: function addWeek(week, body) {
        var row = this.appendTemplate(s4s.templates.datePicker.week, body);
        var days = row.querySelectorAll("button");

        for (var j = 0; j <= 6; j++) {
          days[j].data = week[j];
          days[j].setAttribute("data-date", week[j].dateId || 0);
          days[j].innerText = week[j].day || "";
        }
      }
    }, {
      key: "getDatePart",
      value: function getDatePart(part) {
        return part && part.toString().length === 1 ? "0".concat(part) : part;
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback() {}
    }, {
      key: "market",
      get: function get() {
        return this.getAttribute("market") || "se-sv";
      }
    }, {
      key: "monthNames",
      get: function get() {
        return (this.getAttribute("monthNames") || "").split(",");
      }
    }, {
      key: "outboundLabel",
      get: function get() {
        return this.getAttribute("outbound-label");
      }
    }, {
      key: "inboundLabel",
      get: function get() {
        return this.getAttribute("inbound-label");
      }
    }, {
      key: "dateDelimiter",
      get: function get() {
        return this.getAttribute("date-delimiter");
      }
    }, {
      key: "departureDates",
      get: function get() {
        var departureDateText = "".concat(this.elements.outbound.selectedDate, " ").concat(this.dateDelimiter, " ").concat(this.elements.inbound.selectedDate);

        if (this.mode === "single") {
          departureDateText = "".concat(this.elements.outbound.selectedDate);
        }

        return departureDateText;
      }
    }, {
      key: "mode",
      get: function get() {
        return this.getAttribute("mode") || "double";
      },
      set: function set(value) {
        this.elements.calendar.setAttribute("hidden", true);
        this.setAttribute("mode", value);

        if (value === "single") {
          this.elements.inboundWrap.setAttribute("hidden", true);
          this.setInputValue(!this.elements.outbound.selectedDate.match(/x/gi));
        } else {
          this.elements.inboundWrap.removeAttribute("hidden");
          this.setInputValue(!this.elements.outbound.selectedDate.match(/x/gi) || !this.elements.inbound.selectedDate.match(/x/gi));
        }
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return [];
      }
    }]);

    return S4SDatepicker;
  }(S4SInputBase);

  window.customElements.define("s4s-datepicker", S4SDatepicker);
})(window, document, window.s4s);