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
  var S4SInput = /*#__PURE__*/function (_S4SInputBase) {
    _inherits(S4SInput, _S4SInputBase);

    function S4SInput() {
      _classCallCheck(this, S4SInput);

      return _possibleConstructorReturn(this, _getPrototypeOf(S4SInput).call(this));
    }

    _createClass(S4SInput, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.init(s4s.templates.formField);
        this.prepare();
        this.addElements();
        this.render();
        this.valid = false;
      }
    }, {
      key: "addElements",
      value: function addElements() {
        this.createInput();
        this.elements.formField.appendChild(this.elements.input);
        this.elements.formField.setAttribute("for", this.elements.input.id);
        this.elements.message.innerText = this.message;
        this.elements.label.innerText = this.label;
        this.createTooltip();
      }
    }, {
      key: "createInput",
      value: function createInput() {
        var elem;

        if (["select", "textarea"].indexOf(this.type) > -1) {
          elem = document.createElement(this.type);
        } else {
          elem = document.createElement("input");
          elem.type = this.type;
        }

        elem.name = this.name;
        elem.id = this.id || "".concat(this.name.replace(/[^a-z]/gi, "")).concat(Math.floor(Math.random() * 1000));
        elem.setAttribute("data-validation", this.validation);
        this.addFocusAndBlurEvents(elem);
        this.elements.input = elem;
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback() {
        this.render();
      }
    }, {
      key: "render",
      value: function render() {
        if (!this.connected) {
          return;
        }

        if (this.type === "select" && this.options) {
          this.elements.input.innerHTML = "";

          for (var i = 0; i < this.options.items.length; i++) {
            var option = this.options.items[i];
            var optionElem = document.createElement("option");
            optionElem.value = option.value;
            optionElem.text = option.text;
            this.elements.input.appendChild(optionElem);
          }
        }
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["options"];
      }
    }]);

    return S4SInput;
  }(S4SInputBase);

  window.customElements.define("s4s-input", S4SInput);
})(window, document, window.s4s);