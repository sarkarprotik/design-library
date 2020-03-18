"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

;

(function (window, document) {
  var template = document.createElement("template");
  template.innerHTML = "\n    <fieldset>\n      <legend></legend>\n    </fieldset>\n  ";
  var checkRadioTemplate = document.createElement("template");
  checkRadioTemplate.innerHTML = "\n    <div class=\"check-radio\"><input> <label></label></div>\n  ";

  var sasFieldset = /*#__PURE__*/function (_HTMLElement) {
    _inherits(sasFieldset, _HTMLElement);

    function sasFieldset() {
      _classCallCheck(this, sasFieldset);

      return _possibleConstructorReturn(this, _getPrototypeOf(sasFieldset).call(this));
    }

    _createClass(sasFieldset, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        console.log("connectedCallback");
        this.connected = true;
        this.valid = false;
        this.appendChild(document.importNode(template.content, true));
        this.wrapperElem = this.querySelector("fieldset");
        this.legendElem = this.querySelector("legend");
        this.render();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldVal, newVal) {
        console.log("attributeChangedCallback");
        this.render();
      }
    }, {
      key: "render",
      value: function render() {
        if (!this.connected) {
          return;
        }

        this.legendElem.innerText = this.legend;

        if (this.options) {
          for (var i = 0; i < this.options.items.length; i++) {
            var option = this.options.items[i];
            var checkElem = document.importNode(checkRadioTemplate.content, true);
            var name = this.type === "radio" ? this.name : "".concat(this.name).concat(i);
            checkElem.querySelector("input").value = option.value;
            checkElem.querySelector("input").name = name;
            checkElem.querySelector("input").id = "".concat(this.id).concat(i);
            checkElem.querySelector("input").type = this.type;
            checkElem.querySelector("label").innerText = option.text;
            checkElem.querySelector("label").setAttribute("for", "".concat(this.id).concat(i));
            this.wrapperElem.appendChild(checkElem);
          }
        }
      }
    }, {
      key: "name",
      get: function get() {
        return this.getAttribute("name");
      }
    }, {
      key: "type",
      get: function get() {
        return this.getAttribute("type");
      }
    }, {
      key: "legend",
      get: function get() {
        return this.getAttribute("legend");
      },
      set: function set(value) {
        this.setAttribute("legend", value);
      }
    }, {
      key: "options",
      set: function set(value) {
        this.setAttribute("options", JSON.stringify(value));
      },
      get: function get() {
        return JSON.parse(this.getAttribute("options"));
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["legend", "options"];
      }
    }]);

    return sasFieldset;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  window.customElements.define("flysas-fieldset", sasFieldset);
})(window, document);