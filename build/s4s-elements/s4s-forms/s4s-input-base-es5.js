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

var S4SInputBase = /*#__PURE__*/function (_S4SBase) {
  _inherits(S4SInputBase, _S4SBase);

  function S4SInputBase() {
    var _this;

    _classCallCheck(this, S4SInputBase);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(S4SInputBase).call(this));
    _this.keyCodes = {
      ESC: 27,
      TAB: 9,
      ENTER: 13,
      ARROW_LEFT: 37,
      ARROW_UP: 38,
      ARROW_RIGHT: 39,
      ARROW_DOWN: 40
    };
    return _this;
  }

  _createClass(S4SInputBase, [{
    key: "prepare",
    value: function prepare() {
      this.connected = true;
      this.classList.add("sas-input");

      if (this.querySelector("ul")) {
        this.classList.add("sas-combobox");
      } else if (this.querySelector(".form-calendar")) {
        this.classList.add("sas-datepicker");
      } else if (this.querySelector(".form-custom")) {
        this.classList.add("sas-custom");
      }

      if (this.mandatory) {
        this.classList.add("mandatory");
      }

      this.setAttribute("data-name", this.name);
    }
  }, {
    key: "createTooltip",
    value: function createTooltip() {
      if (this.infoText) {
        var icon = document.createElement("s4s-icon");
        icon.setAttribute("name", "cl--alert-circle");
        icon.setAttribute("additionalClass", "form-field-icon");
        icon.setAttribute("text", this.infoText);
        this.elements.formField.appendChild(icon);
        var toolTip = document.createElement("div");
        toolTip.innerText = this.infoText;
        toolTip.classList.add("form-tooltip", "sas-tooltip", "hidden");
        icon.addEventListener("click", function () {
          toolTip.classList.toggle("hidden");
        });
        this.elements.formField.appendChild(toolTip);
      }
    }
  }, {
    key: "validate",
    value: function validate() {
      var elementValue = this.elements.input.value;
      var hasInvalidValue = this.validation && !new RegExp(this.validation, "gi").test(elementValue);
      this.valid = !hasInvalidValue;
      this.classList.toggle("invalid", hasInvalidValue);
      return this.valid;
    }
  }, {
    key: "addFocusAndBlurEvents",
    value: function addFocusAndBlurEvents(elem) {
      var _this2 = this;

      elem.addEventListener("focus", function (event) {
        _this2.classList.add("focused");

        _this2.publish("sasInputFocused", event.target);
      });
      elem.addEventListener("blur", function (event) {
        _this2.validate();

        if (!elem.value) {
          _this2.classList.remove("focused");
        }
      });
    }
  }, {
    key: "value",
    get: function get() {
      return this.elements.input.value;
    }
  }, {
    key: "label",
    get: function get() {
      return this.getAttribute("label");
    }
  }, {
    key: "name",
    get: function get() {
      return this.getAttribute("name");
    }
  }, {
    key: "id",
    get: function get() {
      return this.getAttribute("id");
    }
  }, {
    key: "type",
    get: function get() {
      return this.getAttribute("type");
    }
  }, {
    key: "validation",
    get: function get() {
      return this.getAttribute("validation");
    }
  }, {
    key: "message",
    get: function get() {
      return this.getAttribute("message");
    }
  }, {
    key: "mandatory",
    get: function get() {
      return this.getAttribute("mandatory");
    }
  }, {
    key: "options",
    set: function set(value) {
      this.setAttribute("options", JSON.stringify(value));
    },
    get: function get() {
      return JSON.parse(this.getAttribute("options"));
    }
  }, {
    key: "doValidation",
    get: function get() {
      return this.validate;
    }
  }, {
    key: "infoText",
    get: function get() {
      return this.getAttribute("infoText");
    }
  }]);

  return S4SInputBase;
}(S4SBase);