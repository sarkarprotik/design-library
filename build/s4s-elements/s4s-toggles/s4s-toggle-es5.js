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
  var S4SToggle = /*#__PURE__*/function (_S4SBase) {
    _inherits(S4SToggle, _S4SBase);

    function S4SToggle() {
      _classCallCheck(this, S4SToggle);

      return _possibleConstructorReturn(this, _getPrototypeOf(S4SToggle).call(this));
    }

    _createClass(S4SToggle, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.init(s4s.templates.toggle.wrap);
        this.addToggles();
      }
    }, {
      key: "addToggles",
      value: function addToggles() {
        var _this = this;

        var toggles = this.options;

        var _loop = function _loop(i) {
          var toggleData = toggles[i];

          var button = _this.appendTemplate(s4s.templates.toggle.button, _this.elements.toggleButtons);

          _this.setElements(button);

          button.data = toggleData;
          button.setAttribute("aria-pressed", toggleData.selected ? true : false);
          button.elements.buttonText.innerText = toggleData.name;
          button.addEventListener("click", function (event) {
            return _this.toggle(event, button);
          });
        };

        for (var i = 0; i < toggles.length; i++) {
          _loop(i);
        }
      }
    }, {
      key: "toggle",
      value: function toggle(event, button) {
        event.preventDefault();
        this.reset();
        button.setAttribute("aria-pressed", true);
        this.publish("triptypeToggle", button.data);
      }
    }, {
      key: "reset",
      value: function reset() {
        var allButtons = this.elements.toggleButtons.children;

        for (var i = 0; i < allButtons.length; i++) {
          allButtons[i].setAttribute("aria-pressed", false);
        }
      }
    }, {
      key: "options",
      get: function get() {
        return JSON.parse(this.getAttribute("options")) || [];
      }
    }]);

    return S4SToggle;
  }(S4SBase);

  window.customElements.define("s4s-toggle", S4SToggle);
})(window, document, window.s4s);