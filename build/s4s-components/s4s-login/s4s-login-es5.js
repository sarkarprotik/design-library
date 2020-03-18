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

(function (window, document) {
  var S4SLogin = /*#__PURE__*/function (_S4SLoggedInCreate) {
    _inherits(S4SLogin, _S4SLoggedInCreate);

    function S4SLogin() {
      var _this;

      _classCallCheck(this, S4SLogin);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(S4SLogin).call(this));
      _this.content = content;
      _this.httpRequest = httpRequest;
      return _this;
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