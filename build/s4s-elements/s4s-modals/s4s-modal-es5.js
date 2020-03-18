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
  var S4SModal = /*#__PURE__*/function (_S4SBase) {
    _inherits(S4SModal, _S4SBase);

    function S4SModal() {
      _classCallCheck(this, S4SModal);

      return _possibleConstructorReturn(this, _getPrototypeOf(S4SModal).call(this));
    }

    _createClass(S4SModal, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this = this;

        this.init(s4s.templates.modal);
        this.elements.close.addEventListener("click", function (event) {
          return _this.setAttribute("hidden", true);
        });

        if (this.getAttribute("heading")) {
          this.elements.heading.innerText = this.getAttribute("heading");
        } else {
          this.elements.heading.parentNode.removeChild(this.elements.heading);
        }

        window.addEventListener("modalVisibility", function (data) {
          if (data.detail.id === _this.getAttribute("modal-id")) {
            _this.toggleAttribute("hidden", !data.detail.visible);
          }
        });
      }
    }]);

    return S4SModal;
  }(S4SBase);

  window.customElements.define("s4s-modal", S4SModal);
})(window, document, window.s4s);