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
  var S4SAccordion = /*#__PURE__*/function (_S4SBase) {
    _inherits(S4SAccordion, _S4SBase);

    function S4SAccordion() {
      _classCallCheck(this, S4SAccordion);

      return _possibleConstructorReturn(this, _getPrototypeOf(S4SAccordion).call(this));
    }

    _createClass(S4SAccordion, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this = this;

        this.init(s4s.templates.accordion);
        this.calculateContent();
        this.expanded = false;
        this.elements.button.addEventListener("click", function (event) {
          return _this.toggleMe(event);
        });
      }
    }, {
      key: "calculateContent",
      value: function calculateContent() {
        this.togglerHeight = this.elements.toggler.clientHeight + 2;
        this.contentHeight = this.elements.content.clientHeight;
        this.elements.accordion.style.height = "".concat(this.togglerHeight, "px");
        this.elements.accordion.style.opacity = 1;
      }
    }, {
      key: "toggleMe",
      value: function toggleMe(event, open) {
        this.expanded = typeof open === "undefined" ? !this.expanded : open;
        this.elements.accordion.style.height = !this.expanded ? "".concat(this.togglerHeight, "px") : "".concat(this.togglerHeight + this.contentHeight, "px");
        this.elements.button.setAttribute("aria-expanded", this.expanded);
      }
    }, {
      key: "toggle",
      set: function set(value) {
        this.toggleMe({}, value);
      }
    }]);

    return S4SAccordion;
  }(S4SBase);

  window.customElements.define("s4s-accordion", S4SAccordion);
})(window, document, window.s4s);