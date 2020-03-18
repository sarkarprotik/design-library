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
  var S4SCustomPax = /*#__PURE__*/function (_S4SInputBase) {
    _inherits(S4SCustomPax, _S4SInputBase);

    function S4SCustomPax() {
      _classCallCheck(this, S4SCustomPax);

      return _possibleConstructorReturn(this, _getPrototypeOf(S4SCustomPax).call(this));
    }

    _createClass(S4SCustomPax, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.init(s4s.templates.custom.input);
        this.addTemplates();
        this.prepare();
        this.createTooltip();
        this.addFocusAndBlurEvents(this.elements.input);
        this.bindEvents();
        this.passengers = {
          adults: Number(this.elements.adultsCount.innerText),
          children: Number(this.elements.childrenCount.innerText),
          infants: Number(this.elements.infantsCount.innerText)
        };
        this.setInputValue();
      }
    }, {
      key: "addTemplates",
      value: function addTemplates() {
        this.appendTemplate(s4s.templates.custom.pax, this.elements.custom);
        this.setElements();
        this.setLabels();
      }
    }, {
      key: "setLabels",
      value: function setLabels() {
        this.elements.adults.innerText = this.adultsLabel;
        this.elements.children.innerText = this.childrenLabel;
        this.elements.infants.innerText = this.infantsLabel;
      }
    }, {
      key: "bindEvents",
      value: function bindEvents() {
        var _this = this;

        var timer = null;
        var self = this;
        this.elements.input.addEventListener("focus", function (event) {
          clearTimeout(timer);
          timer = setTimeout(function () {
            self.elements.custom.removeAttribute("hidden");
          }, 200);
        });
        this.elements.input.addEventListener("blur", function (event) {
          clearTimeout(timer);
          timer = setTimeout(function () {
            self.elements.custom.setAttribute("hidden", true);
          }, 200);
        });
        this.elements.pax.addEventListener("click", function (event) {
          event.preventDefault();
          clearTimeout(timer);

          if (!event.target || !event.target.getAttribute("data-inc")) {
            return;
          }

          var type = event.target.getAttribute("data-type");
          var min = Number(_this.elements[type].getAttribute("data-min"));
          var value = _this.passengers[type] + Number(event.target.getAttribute("data-inc"));
          var isValid = value >= min;

          if (type === "infants") {
            isValid = isValid && value <= _this.passengers["adults"];
          } else if (type === "adults") {
            isValid = isValid && _this.passengers["children"] + value <= 9;
          } else if (type === "children") {
            isValid = isValid && _this.passengers["adults"] + value <= 9;
          }

          if (!isValid) {
            return;
          }

          _this.passengers[type] = value;
          _this.elements["".concat(type, "Count")].innerText = _this.passengers[type];

          _this.setInputValue();
        });
        this.subscribe("sasInputFocused", function (data) {
          if (data.detail !== _this.elements.input) {
            _this.elements.custom.setAttribute("hidden", true);
          }
        });
      }
    }, {
      key: "setInputValue",
      value: function setInputValue() {
        this.elements.input.value = "".concat(this.totalPax, " ").concat(this.passengerLabel);
        this.classList.add("focused");
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
      key: "adultsLabel",
      get: function get() {
        return this.getAttribute("adults-label") || "";
      }
    }, {
      key: "childrenLabel",
      get: function get() {
        return this.getAttribute("children-label") || "";
      }
    }, {
      key: "infantsLabel",
      get: function get() {
        return this.getAttribute("infants-label") || "";
      }
    }, {
      key: "passengerLabel",
      get: function get() {
        return this.getAttribute("passenger-label") || "";
      }
    }, {
      key: "totalPax",
      get: function get() {
        var total = 0;

        for (var prop in this.passengers) {
          total += this.passengers[prop];
        }

        return total;
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return [];
      }
    }]);

    return S4SCustomPax;
  }(S4SInputBase);

  window.customElements.define("s4s-custom-pax", S4SCustomPax);
})(window, document, window.s4s);