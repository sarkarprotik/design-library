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
  var S4SCombobox = /*#__PURE__*/function (_S4SInputBase) {
    _inherits(S4SCombobox, _S4SInputBase);

    function S4SCombobox() {
      var _this;

      _classCallCheck(this, S4SCombobox);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(S4SCombobox).call(this));
      _this.data = {};
      _this.lastFilteredValue = "";
      _this.selectedListItem = null;
      return _this;
    }

    _createClass(S4SCombobox, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.init(s4s.templates.comboBox);
        this.prepare();
        this.createTooltip();
        this.addFocusAndBlurEvents(this.elements.input);
        this.getData();
        this.bindEvents();
      }
    }, {
      key: "getData",
      value: function getData() {
        var _this2 = this;

        this.httpRequest("/assets/data/cepdata_".concat(this.market, ".json"), {}, function (data) {
          data.json().then(function (data) {
            return _this2.data = data;
          });
        });
      }
    }, {
      key: "bindEvents",
      value: function bindEvents() {
        var _this3 = this;

        this.elements.input.addEventListener("keydown", function (event) {
          if ([_this3.keyCodes.ARROW_DOWN].indexOf(event.keyCode) > -1) {
            _this3.selectedListItem = _this3.selectedListItem ? _this3.selectedListItem.nextElementSibling : _this3.elements.listbox.children[0];

            _this3.markListItem();
          } else if ([_this3.keyCodes.ARROW_UP].indexOf(event.keyCode) > -1) {
            _this3.selectedListItem = _this3.selectedListItem ? _this3.selectedListItem.previousElementSibling : _this3.elements.listbox.children[_this3.elements.listbox.children.length - 1];

            _this3.markListItem();
          } else if ([_this3.keyCodes.ENTER, _this3.keyCodes.TAB].indexOf(event.keyCode) > -1) {
            event.stopPropagation();

            _this3.selectListItem();

            _this3.hideItems();

            return;
          }
        });
        this.elements.input.addEventListener("keyup", function (event) {
          event.preventDefault();
          var value = event.target.value.trim();

          if (_this3.lastFilteredValue !== value) {
            _this3.filter(value);

            _this3.selectedListItem = _this3.elements.listbox.children[0];

            _this3.markListItem();
          }

          _this3.lastFilteredValue = value;
        });
        var timer = null;
        var self = this;
        this.elements.input.addEventListener("blur", function (event) {
          clearTimeout(timer);
          timer = setTimeout(function () {
            self.elements.listbox.setAttribute("hidden", true);
          }, 200);
        });
        this.elements.listbox.addEventListener("click", function (event) {
          event.preventDefault();
          _this3.selectedListItem = _this3.getParentElement(event.target, "li");

          _this3.selectListItem();

          _this3.hideItems();
        });
      }
    }, {
      key: "hideItems",
      value: function hideItems() {
        this.elements.listbox.innerHTML = "";
        this.elements.listbox.setAttribute("hidden", true);
        this.lastFilteredValue = "";
        this.selectedListItem = null;
      }
    }, {
      key: "selectListItem",
      value: function selectListItem() {
        if (this.selectedListItem) {
          this.json = this.selectedListItem.data;
          this.elements.input.value = this.selectedListItemText;
        }
      }
    }, {
      key: "markListItem",
      value: function markListItem() {
        if (this.selectedListItem) {
          var prevListItem = this.selectedListItem.previousElementSibling;

          if (prevListItem) {
            prevListItem.classList.remove("key-active");
          }

          var nextListItem = this.selectedListItem.nextElementSibling;

          if (nextListItem) {
            nextListItem.classList.remove("key-active");
          }

          this.selectedListItem.classList.add("key-active");
          this.selectedListItem.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      }
    }, {
      key: "filter",
      value: function filter(value) {
        if (value.length < 2) {
          this.hideItems();
          return;
        }

        var filteredItems = [];
        var items = this.data.countries;

        for (var i = 0; i < items.length; i++) {
          var country = items[i];
          var isCountryMatch = country.name.toLowerCase().indexOf(value.toLowerCase()) > -1;

          for (var j = 0; j < country.cities.length; j++) {
            var city = country.cities[j];
            var isCityMatch = isCountryMatch || city.name.toLowerCase().indexOf(value.toLowerCase()) > -1;

            for (var k = 0; k < city.airports.length; k++) {
              var airport = city.airports[k];
              var isAirportMatch = isCountryMatch || isCityMatch || airport.name.toLowerCase().indexOf(value.toLowerCase()) > -1;

              if (isAirportMatch) {
                filteredItems.push({
                  country: country.name,
                  city: city.name,
                  airport: {
                    code: airport.code,
                    name: airport.name
                  }
                });
              }
            }
          }
        }

        this.addFilteredItems(filteredItems);
        this.elements.listbox.removeAttribute("hidden");
      }
    }, {
      key: "addFilteredItems",
      value: function addFilteredItems(items) {
        var templateElem;
        this.elements.listbox.innerHTML = "";

        for (var i = 0; i < items.length; i++) {
          var listItem = this.appendTemplate(s4s.templates.comboBoxListItem, this.elements.listbox);
          this.setElements(listItem);
          listItem.data = items[i];
          listItem.elements.country.innerText = listItem.data.country;
          listItem.elements.cityAirport.innerText = "".concat(listItem.data.city, " - ").concat(listItem.data.airport.name);
          listItem.elements.airportCode.innerText = listItem.data.airport.code;
        }
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
      key: "selectedListItemText",
      get: function get() {
        return "".concat(this.selectedListItem.data.city, " ").concat(this.selectedListItem.data.airport.code);
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["options"];
      }
    }]);

    return S4SCombobox;
  }(S4SInputBase);

  window.customElements.define("s4s-combobox", S4SCombobox);
})(window, document, window.s4s);