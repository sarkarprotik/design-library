"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

window.s4s = window.s4s || {};

window.s4s.templates = function (window, document) {
  return {
    formField: "\n      <label class=\"form-field\" element=\"formField\">\n        <span class=\"label\" element=\"label\"></span>\n      </label>\n      <span class=\"message\" element=\"message\"></span>\n    ",
    comboBox: "\n      <label id=\"\" role=\"combobox\" aria-expanded=\"false\" aria-owns=\"\" aria-haspopup=\"listbox\" class=\"form-field\" element=\"formField\">\n        <span id=\"\" class=\"label\" element=\"label\"></span>\n        <input id=\"\" type=\"text\" name=\"\" element=\"input\">\n      </label>\n      <span class=\"message\" element=\"message\"></span>\n      <ul id=\"\" aria-labelledby=\"\" role=\"listbox\" element=\"listbox\" hidden></ul>\n    ",
    comboBoxListItem: "\n      <li>\n        <button element=\"button\" tabindex=\"-1\">\n          <div>\n            <span element=\"city-airport\"></span>\n            <span class=\"block-item\" element=\"country\"></span>\n          </div>\n          <strong element=\"airport-code\"></strong>\n        </button>\n      </li>\n    ",
    custom: {
      input: "\n        <label class=\"form-field\" element=\"formField\">\n          <span class=\"label\" element=\"label\"></span>\n          <input id=\"\" type=\"text\" name=\"\" element=\"input\">\n        </label>\n        <div class=\"form-custom\" element=\"custom\" hidden></div>\n      ",
      pax: "\n        <div element=\"pax\">\n          <div class=\"pax-type\">\n            <span element=\"adults\" data-min=\"1\"></span>\n            <div class=\"calculator\">\n              <button data-type=\"adults\" data-inc=\"-1\" tabindex=\"-1\">-</button>\n              <span element=\"adults-count\">1</span>\n              <button data-type=\"adults\" data-inc=\"1\" tabindex=\"-1\">+</button>\n            </div>\n          </div>\n          <div class=\"pax-type\">\n            <span element=\"children\" data-min=\"0\"></span>\n            <div class=\"calculator\">\n              <button data-type=\"children\" data-inc=\"-1\" tabindex=\"-1\">-</button>\n              <span element=\"children-count\">0</span>\n              <button data-type=\"children\" data-inc=\"1\" tabindex=\"-1\">+</button>\n            </div>\n          </div>\n          <div class=\"pax-type\">\n            <span element=\"infants\" data-min=\"0\"></span>\n            <div class=\"calculator\">\n              <button data-type=\"infants\" data-inc=\"-1\" tabindex=\"-1\">-</button>\n              <span element=\"infants-count\">0</span>\n              <button data-type=\"infants\" data-inc=\"1\" tabindex=\"-1\">+</button>\n            </div>\n          </div>\n        </div>\n      "
    },
    datePicker: {
      input: "\n        <label class=\"form-field\" element=\"formField\">\n          <span class=\"label\" element=\"label\"></span>\n          <input id=\"\" type=\"text\" name=\"\" element=\"input\">\n        </label>\n        <div class=\"form-calendar\" element=\"calendar\" hidden></div>\n      ",
      tablesWrap: "\n        <div class=\"table-calendar\" element=\"outbound-wrap\">\n          <table element=\"outbound\"></table>\n        </div>\n        <div class=\"table-calendar\" element=\"inbound-wrap\">\n          <table element=\"inbound\"></table>\n        </div>\n      ",
      table: "\n        <thead>\n          <tr>\n            <th colspan=\"7\" element=\"type\"></th>\n          </tr>\n          <tr>\n            <th><button class=\"btn-prev\" element=\"prev-month\" tabindex=\"-1\"></button></th>\n            <th class=\"month-header\" colspan=\"5\" element=\"month-name\"></th>\n            <th><button class=\"btn-next\" element=\"next-month\" tabindex=\"-1\"></button></th>\n          </tr>\n          <tr>\n            <th>M</th>\n            <th>T</th>\n            <th>O</th>\n            <th>T</th>\n            <th>F</th>\n            <th>L</th>\n            <th>S</th>\n          </tr>\n        </thead>\n        <tbody element=\"body\"></tbody>\n      ",
      week: "\n        <tr>\n          <td><button tabindex=\"-1\"></button></td>\n          <td><button tabindex=\"-1\"></button></td>\n          <td><button tabindex=\"-1\"></button></td>\n          <td><button tabindex=\"-1\"></button></td>\n          <td><button tabindex=\"-1\"></button></td>\n          <td><button tabindex=\"-1\"></button></td>\n          <td><button tabindex=\"-1\"></button></td>\n        </tr>\n      "
    },
    modal: "\n      <div class=\"flysas modal open\" role=\"dialog\" aria-modal=\"true\" element=\"modal\">\n        <div class=\"modal-content\">\n          <h1 class=\"h2 modal-title\" element=\"heading\"></h1>\n          <button type=\"button\" class=\"btn btn-lg btn-close\" data-close=\"true\" aria-label=\"Close Modal\" element=\"close\">\n            <s4s-icon name=\"in--close\"></s4s-icon>\n          </button>\n          <div class=\"slot-content\" element=\"content\"></div>\n        </div>\n      </div>\n    ",
    card: "\n      <a href=\"\" class=\"card banner banner-hero\" element=\"card\">\n        <div class=\"sas-image sas-image-fill\" element=\"image-wrap\">\n          <img src=\"\" role=\"presentation\" element=\"image\">\n        </div>\n        <div class=\"content slot-content\" element=\"content\">\n          <h1 element=\"heading\"></h1>\n          <h2 element=\"subheading\"></h2>\n          <button class=\"btn-md\" element=\"button\"></button>\n        </div>\n      </a>\n    ",
    demo: "\n      <form class=\"sas-form-grid\" onsubmit=\"return false\">\n        <fieldset>\n          <legend>Demo test</legend>\n          <s4s-input id=\"img-src\" label=\"Img src test\" element=\"imgInput\"></s4s-input>\n        </fieldset>\n        <fieldset>\n          <button type=\"submit\" element=\"button\">Skicka</button>\n        </fieldset>\n      </form>\n    ",
    accordion: "\n      <div class=\"flysas-accordion\" element=\"accordion\">\n        <div class=\"accordion-btn\" element=\"toggler\">\n          <button class=\"btn btn-toggle\" aria-expanded=\"false\" element=\"button\">\n            <span element=\"label\"></span>\n            <s4s-icon name=\"cl--arrow-up\"></s4s-icon>\n          </button>\n        </div>\n        <div class=\"accordion-content slot-content\" element=\"content\"><s4s-icon name=\"cl--arrow-up\"></s4s-icon></div>\n      </div>\n    ",
    toggle: {
      wrap: "\n        <div class=\"flysas-toggles toggles\">\n          <div class=\"toggle-btns\" element=\"toggle-buttons\"></div>\n        </div>\n      ",
      button: "\n        <button class=\"btn btn-md\" aria-pressed=\"true\"><span element=\"button-text\"></span></button>\n      "
    },
    cep: "\n      <s4s-toggle options='[{\"id\":\"oneway\",\"name\":\"Enkel resa\"},{\"id\":\"roundtrip\",\"name\":\"Tur retur\",\"selected\":true}]'></s4s-toggle>\n      <form class=\"sas-form-flex\" element=\"form\">\n        <s4s-combobox label=\"Fr\xE5n*\" market=\"se-sv\" element=\"from\"></s4s-combobox>\n        <s4s-combobox label=\"Till*\" market=\"se-sv\" element=\"to\"></s4s-combobox>\n        <s4s-datepicker\n          label=\"Avresedatum*\"\n          outbound-label=\"Avresa\"\n          inbound-label=\"Hemresa\"\n          monthNames=\"Jan,Feb,Mar,Apr,Maj,Juni,Juli,Aug,Sep,Okt,Nov,Dec\"\n          date-delimiter=\"till\"\n          market=\"se-sv\"\n          element=\"datepicker\">\n        </s4s-datepicker>\n        <s4s-custom-pax\n          class=\"focused\"\n          label=\"Resen\xE4rer*\"\n          adults-label=\"Vuxna\"\n          children-label=\"Barn (2-11 \xE5r)\"\n          infants-label=\"Sp\xE4dbarn (0-23 m\xE5nader)\"\n          passenger-label=\"passagerare\"\n          market=\"se-sv\"\n          element=\"pax\">\n        </s4s-custom-pax>\n        <button class=\"btn-lg\" element=\"button\">S\xF6k</button>\n      </form>\n    "
  };
}(window, document);

var S4SBase = /*#__PURE__*/function (_HTMLElement) {
  _inherits(S4SBase, _HTMLElement);

  function S4SBase() {
    var _this;

    _classCallCheck(this, S4SBase);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(S4SBase).call(this));
    _this.elements = {};
    return _this;
  }

  _createClass(S4SBase, [{
    key: "init",
    value: function init(template) {
      this.html = this.innerHTML.trim();
      this.innerHTML = "";
      this.appendTemplate(template);
      this.setSlotContent();
      this.setElements();
    }
  }, {
    key: "appendTemplate",
    value: function appendTemplate(template, parent) {
      var self = parent || this;

      if (template) {
        var templateElem = document.createElement("template");
        templateElem.innerHTML = template;
        self.appendChild(document.importNode(templateElem.content, true));
        return self.lastElementChild;
      }

      return self;
    }
  }, {
    key: "setSlotContent",
    value: function setSlotContent() {
      if (this.querySelector(".slot-content") && this.html) {
        this.querySelector(".slot-content").innerHTML = this.html;
      }
    }
  }, {
    key: "setElements",
    value: function setElements(parent) {
      var self = parent || this;
      self.elements = self.elements || {};
      var elements = self.querySelectorAll("[element]");

      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var elementName = element.getAttribute("element").replace(/-([\w]{1})/gi, function (group) {
          return group.replace("-", "").toUpperCase();
        });
        self.elements[elementName] = element;
        var baseAttributeValue = self.getAttribute(elementName) || self.getAttribute(element.getAttribute("element"));

        if (baseAttributeValue) {
          switch (element.tagName) {
            case "IMG":
              element.src = baseAttributeValue;
              break;

            default:
              element.innerText = baseAttributeValue;
              break;
          }
        }
      }
    }
  }, {
    key: "getParentElement",
    value: function getParentElement(elem, selector) {
      while (elem.parentElement) {
        if (elem.classList.contains(selector) || elem.tagName === selector.toUpperCase()) {
          return elem;
        }

        elem = elem.parentElement;
      }
    }
  }, {
    key: "publish",
    value: function publish(key, value) {
      window.dispatchEvent(new CustomEvent(key, {
        detail: value
      }));
    }
  }, {
    key: "subscribe",
    value: function subscribe(key, callback) {
      window.addEventListener(key, callback);
    }
  }, {
    key: "httpRequest",
    value: function httpRequest(url, options, callback) {
      fetch(url, options).then(callback);
    }
  }]);

  return S4SBase;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

var S4SInputBase = /*#__PURE__*/function (_S4SBase) {
  _inherits(S4SInputBase, _S4SBase);

  function S4SInputBase() {
    var _this2;

    _classCallCheck(this, S4SInputBase);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(S4SInputBase).call(this));
    _this2.keyCodes = {
      ESC: 27,
      TAB: 9,
      ENTER: 13,
      ARROW_LEFT: 37,
      ARROW_UP: 38,
      ARROW_RIGHT: 39,
      ARROW_DOWN: 40
    };
    return _this2;
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
      var _this3 = this;

      elem.addEventListener("focus", function (event) {
        _this3.classList.add("focused");

        _this3.publish("sasInputFocused", event.target);
      });
      elem.addEventListener("blur", function (event) {
        _this3.validate();

        if (!elem.value) {
          _this3.classList.remove("focused");
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

(function (window, document) {
  var S4sIcon = /*#__PURE__*/function (_HTMLElement2) {
    _inherits(S4sIcon, _HTMLElement2);

    function S4sIcon() {
      _classCallCheck(this, S4sIcon);

      return _possibleConstructorReturn(this, _getPrototypeOf(S4sIcon).call(this));
    }

    _createClass(S4sIcon, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var svgURI = "http://www.w3.org/2000/svg";
        var icon = document.createElementNS(svgURI, "svg");
        var path = document.createElementNS(svgURI, "use");
        var iconName = this.getAttribute("name");
        var additionalClass = this.getAttribute("additionalClass");

        if (additionalClass) {
          icon.classList.add(additionalClass);
        }

        icon.classList.add("sas-icon", "sas-icon-" + iconName);
        path.setAttribute("xlink:href", "#" + iconName);
        path.setAttribute("href", "#" + iconName);
        icon.appendChild(path);
        var iconText = this.getAttribute("text");

        if (iconText) {
          icon.setAttribute("role", "icon");
          var title = document.createElement("title");
          title.innerText = iconText;
          icon.appendChild(title);
        } else {
          icon.setAttribute("role", "presentation");
        }

        this.appendChild(icon);
        this.iconName = iconName;
        this.icon = icon;
        this.path = path;
        this.iconText = iconText;
      }
    }]);

    return S4sIcon;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  window.customElements.define("s4s-icon", S4sIcon);
})(window, document);

(function (window, document, s4s) {
  var S4SModal = /*#__PURE__*/function (_S4SBase2) {
    _inherits(S4SModal, _S4SBase2);

    function S4SModal() {
      _classCallCheck(this, S4SModal);

      return _possibleConstructorReturn(this, _getPrototypeOf(S4SModal).call(this));
    }

    _createClass(S4SModal, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this4 = this;

        this.init(s4s.templates.modal);
        this.elements.close.addEventListener("click", function (event) {
          return _this4.setAttribute("hidden", true);
        });

        if (this.getAttribute("heading")) {
          this.elements.heading.innerText = this.getAttribute("heading");
        } else {
          this.elements.heading.parentNode.removeChild(this.elements.heading);
        }

        window.addEventListener("modalVisibility", function (data) {
          if (data.detail.id === _this4.getAttribute("modal-id")) {
            _this4.toggleAttribute("hidden", !data.detail.visible);
          }
        });
      }
    }]);

    return S4SModal;
  }(S4SBase);

  window.customElements.define("s4s-modal", S4SModal);
})(window, document, window.s4s);

(function (window, document, s4s) {
  var S4SAccordion = /*#__PURE__*/function (_S4SBase3) {
    _inherits(S4SAccordion, _S4SBase3);

    function S4SAccordion() {
      _classCallCheck(this, S4SAccordion);

      return _possibleConstructorReturn(this, _getPrototypeOf(S4SAccordion).call(this));
    }

    _createClass(S4SAccordion, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this5 = this;

        this.init(s4s.templates.accordion);
        this.calculateContent();
        this.expanded = false;
        this.elements.button.addEventListener("click", function (event) {
          return _this5.toggleMe(event);
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

var S4SLoginBase = /*#__PURE__*/function (_S4SBase4) {
  _inherits(S4SLoginBase, _S4SBase4);

  function S4SLoginBase() {
    _classCallCheck(this, S4SLoginBase);

    return _possibleConstructorReturn(this, _getPrototypeOf(S4SLoginBase).call(this));
  }

  _createClass(S4SLoginBase, [{
    key: "createElement",
    value: function createElement(element, options) {
      var classes = options.classes,
          innerText = options.innerText,
          innerHTML = options.innerHTML,
          attributes = options.attributes;
      var result = document.createElement(element);

      if (innerHTML) {
        result.innerHTML = innerHTML;
      } else if (innerText) {
        result.innerText = innerText;
      }

      if (classes) {
        classes.forEach(function (className) {
          result.classList.add(className);
        });
      }

      if (attributes) {
        for (var key in attributes) {
          result.setAttribute(key, attributes[key]);
        }
      }

      return result;
    }
  }, {
    key: "appendChildren",
    value: function appendChildren(component, elements) {
      return elements.forEach(function (element) {
        if (element) {
          component.appendChild(element);
        }
      });
    }
  }]);

  return S4SLoginBase;
}(S4SBase);

var S4SLoginCreate = /*#__PURE__*/function (_S4SLoginBase) {
  _inherits(S4SLoginCreate, _S4SLoginBase);

  function S4SLoginCreate() {
    _classCallCheck(this, S4SLoginCreate);

    return _possibleConstructorReturn(this, _getPrototypeOf(S4SLoginCreate).call(this));
  }

  _createClass(S4SLoginCreate, [{
    key: "addLoginElements",
    value: function addLoginElements() {
      var wrapper = this.createElement("div", {
        classes: ["s4s-login"]
      });
      var elementsToBeAddedOnWrapper = [this.createElement("h1", {
        classes: ["h2"],
        innerText: this.content.login.heading
      }), this.createForm(), document.createElement("hr"), this.createForgotPassword(), this.createElement("h2", {
        classes: ["h3"],
        innerText: this.content.login.subHeading
      }), this.createButtonRegister(), this.createForgotPasswordModal(), this.createRegisterModal()];
      this.appendChildren(wrapper, elementsToBeAddedOnWrapper);
      this.appendChild(wrapper);
      this.setAttribute("hidden", true);
      this.wrapper = wrapper;
    }
  }, {
    key: "createForm",
    value: function createForm() {
      var _this6 = this;

      var form = document.createElement("form");
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var allInputs = Array.from(form.querySelectorAll("s4s-input"));
        var isValidForm = allInputs.filter(function (item) {
          return !item.doValidation();
        }).length === 0;

        if (isValidForm) {
          _this6.httpRequest("s4s-components/get-profile", {
            method: "POST"
          }, function (data) {
            var status = data.status;

            if (status !== 200) {
              _this6.publish("getProfileDone", {
                status: status
              });

              return;
            }

            return data.json().then(function (profileData) {
              _this6.publish("getProfileDone", {
                status: status,
                data: profileData
              });
            });
          });
        }
      });
      var requiredField = this.createElement("p", {
        classes: ["text-right"],
        innerText: this.content.login.requiredText
      });
      form.appendChild(requiredField);
      this.content.login.inputFields.forEach(function (field) {
        var input = _this6.createInput(field);

        form.appendChild(input);
      });
      var submit = this.createElement("button", {
        innerText: this.content.login.submitLabel,
        classes: ["block-element"]
      });
      form.appendChild(submit);
      return form;
    }
  }, {
    key: "createForgotPassword",
    value: function createForgotPassword() {
      var _this7 = this;

      var forgotPassword = this.createElement("button", {
        innerText: this.content.login.passwordReset.text,
        classes: ["reset", "btn-link"]
      });
      forgotPassword.addEventListener("click", function (event) {
        return _this7.publish("modalVisibility", {
          visible: true,
          id: _this7.content.login.modals.forgotPassword.id
        });
      });
      return forgotPassword;
    }
  }, {
    key: "createInput",
    value: function createInput(field) {
      var input = this.createElement("s4s-input", {
        classes: ["block-element"]
      });

      for (var key in field) {
        input.setAttribute(key, field[key]);
      }

      return input;
    }
  }, {
    key: "createButtonRegister",
    value: function createButtonRegister() {
      var _this8 = this;

      var buttonRegister = this.createElement("button", {
        innerText: this.content.login.buttonLabel,
        classes: ["block-element", "btn-secondary"]
      });
      buttonRegister.addEventListener("click", function (event) {
        return _this8.publish("modalVisibility", {
          visible: true,
          id: _this8.content.login.modals.register.id
        });
      });
      return buttonRegister;
    }
  }, {
    key: "createForgotPasswordModal",
    value: function createForgotPasswordModal() {
      var forgotPassword = this.content.login.modals.forgotPassword;
      var modal = document.createElement("s4s-modal");
      modal.setAttribute("modal-id", forgotPassword.id);
      modal.setAttribute("hidden", true);
      modal.innerHTML = "\n    <h1 class=".concat(forgotPassword.heading.class, ">").concat(forgotPassword.heading.text, "</h1>\n    <h2 class=").concat(forgotPassword.subheading.class, ">").concat(forgotPassword.subheading.text, "</h2>\n    <form\n    class=").concat(forgotPassword.form.class, "\n    >\n    <s4s-input \n      class= ").concat(forgotPassword.form.input.class, "\n      label=").concat(forgotPassword.form.input.label, " \n      name=").concat(forgotPassword.form.input.name, " \n      type=").concat(forgotPassword.form.input.type, " \n      message=").concat(forgotPassword.form.input.message, "\n      validation=").concat(forgotPassword.form.input.validation, "\n    >\n    </s4s-input>\n    <button \n      type=").concat(forgotPassword.form.submit.type, "\n      class=").concat(forgotPassword.form.submit.class, "\n    >\n      ").concat(forgotPassword.form.submit.text, "\n    </button>\n    <form>\n    ");
      return modal;
    }
  }, {
    key: "createRegisterModal",
    value: function createRegisterModal() {
      var register = this.content.login.modals.register;
      var modal = document.createElement("s4s-modal");
      modal.setAttribute("modal-id", register.id);
      modal.setAttribute("hidden", true);
      modal.innerHTML = "\n    <h1 class=".concat(register.heading.class, ">").concat(register.heading.text, "</h1>\n    <form\n    class=").concat(register.form.class, "\n    >\n    <s4s-input \n      class= ").concat(register.form.input.class, "\n      label=").concat(register.form.input.label, " \n      name=").concat(register.form.input.name, " \n      type=").concat(register.form.input.type, " \n      message=").concat(register.form.input.message, "\n      validation=").concat(register.form.input.validation, "\n    >\n    </s4s-input>\n    <button \n      type=").concat(register.form.submit.type, "\n      class=").concat(register.form.submit.class, "\n    >\n      ").concat(register.form.submit.text, "\n    </button>\n    <form>\n    ");
      return modal;
    }
  }]);

  return S4SLoginCreate;
}(S4SLoginBase);

var S4SLoggedInBusiness = /*#__PURE__*/function (_S4SLoginCreate) {
  _inherits(S4SLoggedInBusiness, _S4SLoginCreate);

  function S4SLoggedInBusiness() {
    _classCallCheck(this, S4SLoggedInBusiness);

    return _possibleConstructorReturn(this, _getPrototypeOf(S4SLoggedInBusiness).call(this));
  }

  _createClass(S4SLoggedInBusiness, [{
    key: "createBusinessState",
    value: function createBusinessState() {
      this.businessState = document.createElement("div");
      var header = this.createColoredHeading();
      var tags = [];

      if (this.isTravelAdmin()) {
        tags = [this.createTag("admin", "Admin")];
      }

      var info = this.addCorporateInfo();
      var travelPass = this.createTravelPass();
      var settings = this.createLink(this.content.loggedIn.settings);
      var logout = this.createLink(this.content.loggedIn.logOut);
      this.appendChildren(this.businessState, [header].concat(_toConsumableArray(tags), _toConsumableArray(info), [settings, travelPass, logout]));
    }
  }, {
    key: "addCorporateInfo",
    value: function addCorporateInfo() {
      return [document.createElement("hr"), this.createLink(this.content.loggedIn.companyDetails), this.createLink(this.content.loggedIn.travelers)];
    }
  }, {
    key: "isTravelAdmin",
    value: function isTravelAdmin() {
      return !!this.data.corporateMemberEngagement.corporateMember[0].isTravelAdmin;
    }
  }]);

  return S4SLoggedInBusiness;
}(S4SLoginCreate);

var S4SLoggedInEurobonus = /*#__PURE__*/function (_S4SLoggedInBusiness) {
  _inherits(S4SLoggedInEurobonus, _S4SLoggedInBusiness);

  function S4SLoggedInEurobonus() {
    _classCallCheck(this, S4SLoggedInEurobonus);

    return _possibleConstructorReturn(this, _getPrototypeOf(S4SLoggedInEurobonus).call(this));
  }

  _createClass(S4SLoggedInEurobonus, [{
    key: "addEurobonusInfo",
    value: function addEurobonusInfo() {
      var tags = [this.createTag(this.data.euroBonus.currentTierCode, this.data.euroBonus.currentTierName)];

      if (this.data.euroBonus.lifeTimeGold) {
        tags.push(this.createTag("G", "Lifetime Gold"));
      }

      var info = this.addPrivateInfo();
      var travelPass = this.createTravelPass(this.data.engagements.travelPass);
      this.appendChildren(this.privateState, [].concat(tags, _toConsumableArray(info), [travelPass]));
    }
  }, {
    key: "addPrivateInfo",
    value: function addPrivateInfo() {
      return [this.createEurobonusinfo(), this.createLink(this.content.loggedIn.eurobonus)];
    }
  }, {
    key: "createEurobonusinfo",
    value: function createEurobonusinfo() {
      var info = this.createElement("div", {
        classes: ["info-block"]
      });
      var pointsHeading = this.createElement("h2", {
        classes: ["h4"],
        innerText: this.content.loggedIn.eurobonusPoints
      });
      var expirationHeading = this.createElement("h2", {
        classes: ["h4"],
        innerText: this.content.loggedIn.expiringPoints
      });
      var points = this.createElement("p", {
        innerText: spaceAtThousand(this.data.euroBonus.totalPointsForUse)
      });
      var eurobonusExpire = this.createEurobonusExpire();
      this.appendChildren(info, [pointsHeading, points, expirationHeading, eurobonusExpire]);
      return info;
    }
  }, {
    key: "createEurobonusExpire",
    value: function createEurobonusExpire() {
      var eurobonusExpire = this.findSoonestToBeExpired(this.data.euroBonus.awardPointsExpiry);
      var soonestEurobonusToExpire = document.createElement("template");
      soonestEurobonusToExpire.innerHTML = "<p>".concat(spaceAtThousand(eurobonusExpire.points), " (<span>").concat(eurobonusExpire.formattedDate, "</span>)</p>");

      if (this.expiresInAMonth(eurobonusExpire.expiryDate)) {
        soonestEurobonusToExpire.content.querySelector("span").classList.add("color-r");
      }

      return document.importNode(soonestEurobonusToExpire.content, true);
    }
  }, {
    key: "findSoonestToBeExpired",
    value: function findSoonestToBeExpired(eurobonuses) {
      return eurobonuses.reduce(function (min, eb) {
        return Date.parse(eb.expiryDate) < Date.parse(min.expiryDate) ? eb : min;
      }, eurobonuses[0]);
    }
  }, {
    key: "expiresInAMonth",
    value: function expiresInAMonth(date) {
      var month = 1000 * 60 * 60 * 24 * 30;
      return Date.parse(date) - Date.now() <= month;
    }
  }]);

  return S4SLoggedInEurobonus;
}(S4SLoggedInBusiness);

var S4SLoggedInPrivate = /*#__PURE__*/function (_S4SLoggedInEurobonus) {
  _inherits(S4SLoggedInPrivate, _S4SLoggedInEurobonus);

  function S4SLoggedInPrivate() {
    _classCallCheck(this, S4SLoggedInPrivate);

    return _possibleConstructorReturn(this, _getPrototypeOf(S4SLoggedInPrivate).call(this));
  }

  _createClass(S4SLoggedInPrivate, [{
    key: "createPrivateState",
    value: function createPrivateState() {
      this.privateState = document.createElement("div");
      var header = this.createColoredHeading(this.data);
      this.privateState.appendChild(header);

      if (this.isEurobonusMember()) {
        this.addEurobonusInfo();
      }

      var settings = this.createLink(this.content.loggedIn.settings);
      var logout = this.createLink(this.content.loggedIn.logOut);
      this.appendChildren(this.privateState, [settings, logout]);
    }
  }]);

  return S4SLoggedInPrivate;
}(S4SLoggedInEurobonus);

var switcherIcon = "<s4s-icon name=\"cl--swap\" additionalClass=\"right\"></s4s-icon>";

var Accordion = /*#__PURE__*/function (_S4SLoggedInPrivate) {
  _inherits(Accordion, _S4SLoggedInPrivate);

  function Accordion() {
    _classCallCheck(this, Accordion);

    return _possibleConstructorReturn(this, _getPrototypeOf(Accordion).call(this));
  }

  _createClass(Accordion, [{
    key: "createAccordion",
    value: function createAccordion() {
      this.accordion = this.createElement("s4s-accordion", {
        attributes: {
          label: this.content.loggedIn.states.private.label
        },
        innerHTML: "<a href=\"/\" element=\"switcher\">".concat(switcherIcon).concat(this.content.loggedIn.states.business.label, "</a>")
      });
    }
  }, {
    key: "switchState",
    value: function switchState() {
      this.hideAndShowState();
      this.switchAccordionLabels();
      this.accordion.toggle = false;
    }
  }, {
    key: "hideAndShowState",
    value: function hideAndShowState() {
      var currentSwitcherLabel = this.accordion.elements.switcher.innerText.toLowerCase();

      if (currentSwitcherLabel === this.content.loggedIn.states.business.label.toLowerCase()) {
        this.privateState.setAttribute("hidden", true);
        this.businessState.removeAttribute("hidden");
      }

      if (currentSwitcherLabel === this.content.loggedIn.states.private.label.toLowerCase()) {
        this.privateState.removeAttribute("hidden");
        this.businessState.setAttribute("hidden", true);
      }
    }
  }, {
    key: "switchAccordionLabels",
    value: function switchAccordionLabels() {
      var tmp = this.accordion.elements.switcher.innerText;
      this.accordion.elements.switcher.innerHTML = "".concat(switcherIcon).concat(this.accordion.elements.label.innerText.toLowerCase().replace("sas", "SAS"));
      this.accordion.elements.label.innerText = tmp;
    }
  }]);

  return Accordion;
}(S4SLoggedInPrivate);

var S4SLoggedInCreate = /*#__PURE__*/function (_Accordion) {
  _inherits(S4SLoggedInCreate, _Accordion);

  function S4SLoggedInCreate() {
    _classCallCheck(this, S4SLoggedInCreate);

    return _possibleConstructorReturn(this, _getPrototypeOf(S4SLoggedInCreate).call(this));
  }

  _createClass(S4SLoggedInCreate, [{
    key: "addLoggedInElements",
    value: function addLoggedInElements(data) {
      var _this9 = this;

      this.data = data;
      this.states = this.content.loggedIn.states;
      this.wrapper.hidden = true;
      var wrapper = this.createElement("div", {
        classes: ["s4s-login"]
      });
      this.appendChild(wrapper);

      if (this.isSASForBusinessMember()) {
        this.createAccordion();
        wrapper.appendChild(this.accordion);
        this.accordion.elements.switcher.addEventListener("click", function (event) {
          event.preventDefault();

          _this9.publish("LoginTogglerClicked", _this9.accordion.elements.switcher.innerHTML);

          _this9.switchState();
        });
      }

      this.createPrivateState(data);
      wrapper.appendChild(this.privateState);

      if (this.isSASForBusinessMember()) {
        this.createBusinessState(data);
        wrapper.appendChild(this.businessState);
        this.businessState.setAttribute("hidden", true);
      }
    }
  }, {
    key: "createTravelPass",
    value: function createTravelPass() {
      if ((this.data.engagements || {}).travelPass) {
        var travelPass = this.createLink(this.content.loggedIn.travelPass);
        var icon = document.createElement("s4s-icon");
        icon.setAttribute("name", "cl--new-window");
        travelPass.appendChild(icon);
        return travelPass;
      }
    }
  }, {
    key: "createColoredHeading",
    value: function createColoredHeading() {
      var template = document.createElement("template");
      var greetingColor = this.isEurobonusMember() ? this.data.euroBonus.currentTierCode.toLowerCase() : "b";
      template.innerHTML = "<h1 class=\"h2\"> <span class=\"".concat("greeting greeting-".concat(greetingColor), "\">", this.content.loggedIn.greeting[this.getRandomInteger(0, 7)], "</span> ").concat(this.data.individual.firstName, "!</h1>");
      return document.importNode(template.content, true);
    }
  }, {
    key: "getRandomInteger",
    value: function getRandomInteger(min, max) {
      return Math.floor(Math.random() * max) + min;
    }
  }, {
    key: "createLink",
    value: function createLink(_ref) {
      var text = _ref.text,
          href = _ref.href,
          className = _ref.className;
      var paragraph = document.createElement("p");
      var link = this.createElement("a", {
        classes: [className],
        innerText: text,
        attributes: {
          href: href
        }
      });
      paragraph.appendChild(link);
      return paragraph;
    }
  }, {
    key: "createTag",
    value: function createTag(tierCode, tierName) {
      return this.createElement("div", {
        classes: ["tag", "tag-" + tierCode.toLowerCase()],
        innerText: tierName
      });
    }
  }, {
    key: "isSASForBusinessMember",
    value: function isSASForBusinessMember() {
      return !!this.data.corporateMemberEngagement;
    }
  }, {
    key: "isEurobonusMember",
    value: function isEurobonusMember() {
      return !!(this.data.engagements || {}).euroBonus;
    }
  }]);

  return S4SLoggedInCreate;
}(Accordion);

var spaceAtThousand = function spaceAtThousand(str) {
  return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};

(function (window, document) {
  var S4SLogin = /*#__PURE__*/function (_S4SLoggedInCreate) {
    _inherits(S4SLogin, _S4SLoggedInCreate);

    function S4SLogin() {
      var _this10;

      _classCallCheck(this, S4SLogin);

      _this10 = _possibleConstructorReturn(this, _getPrototypeOf(S4SLogin).call(this));
      _this10.content = content;
      _this10.httpRequest = httpRequest;
      return _this10;
    }

    _createClass(S4SLogin, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.addLoginElements();
      }
    }]);

    return S4SLogin;
  }(S4SLoggedInCreate);

  var isTestOrProd = /(www|test)\.(fly)?sas\.(com|se|no|dk|fi)/gi.test(location.hostname);

  var httpRequest = function httpRequest(endOfPath, options, callback) {
    var url = isTestOrProd ? "/v2/de-design-library/".concat(endOfPath) : "/".concat(endOfPath);
    fetch(url, options).then(callback);
  };

  var content;

  var loadContent = function loadContent() {
    if (!content) {
      httpRequest("s4s-components/content.json", {}, function (data) {
        return data.json().then(function (data) {
          content = data;
          window.dispatchEvent(new CustomEvent("contentLoaded"));
        });
      });
    } else {
      document.querySelector("s4s-login").removeAttribute("hidden");
    }
  };

  window.addEventListener("getProfileDone", function (event) {
    if (event.detail.status == 200) {
      document.querySelector("s4s-login").addLoggedInElements(event.detail.data);
    }
  });
  var opener = document.querySelectorAll(".s4s-login-opener");
  opener.forEach(function (elem) {
    elem.addEventListener("click", function () {
      window.dispatchEvent(new CustomEvent("loginOpenerClicked", {}));
    });
  });
  window.addEventListener("contentLoaded", function () {
    window.customElements.define("s4s-login", S4SLogin);
    var s4sLogin = document.querySelector("s4s-login");
    s4sLogin.toggleAttribute("hidden");
    s4sLogin.addEventListener("click", function (event) {
      if (event.target === s4sLogin) {
        s4sLogin.setAttribute("hidden", true);
      }
    });
  });
  window.addEventListener("loginOpenerClicked", function () {
    loadContent();
  });
})(window, document);