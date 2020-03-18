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

var template = document.createElement("template");
template.innerHTML = "\n  <style>\n    flysas-destination-map {\n      position: fixed;\n      z-index: 3;\n      left: 0;\n      top: 0;\n      width: 100%;\n      height: 100%;\n      opacity: 0;\n      transition: opacity 1s;\n    }\n\n    .flysas-map {\n      width: 100%;\n      height: 100%;\n    }\n\n    .flysas-map-modal {\n      position: fixed;\n      z-index: 4;\n      left: 0;\n      top: 0;\n      width: 100%;\n      height: 100%;\n      background: rgba(0, 0, 0, .5);\n      display: none;\n    }\n\n    .flysas-map-modal.open {\n      display: flex;\n      flex-flow: column;\n      justify-content: center;\n    }\n\n    .flysas-map-modal .flysas-widget {\n      background: #fff;\n      overflow: auto;\n    }\n\n    .flysas-map-modal .flysas-widget .col-form-destinations,\n    .flysas-map-modal .flysas-widget .btn-back,\n    .flysas-map-modal .flysas-widget .btn-forward,\n    .flysas-map-modal .flysas-widget .planner-description,\n    .flysas-map-modal .flysas-widget .planner-country {\n      display: none !important;\n    }\n\n    .flysas-map-modal .flysas-widget .planner-city {\n      font-size: 14px !important;\n      font-family: scandinavian !important;\n    }\n\n    .flysas-widget.lowprice-calendar .planner-header-top thead th {\n      font-family: scandinavian !important;\n      font-weight: 700 !important;\n    }\n\n    .flysas-map-modal .flysas-widget .planner-container {\n      padding-top: 16px !important;\n    }\n\n    .flysas-map-modal .flysas-widget .planner-top .planner-container {\n      padding: 0 !important;\n    }\n\n    .flysas-map-modal .flysas-widget .sas-input {\n      height: 52px !important;\n      margin: 0 !important;\n    }\n\n    .flysas-map-modal .flysas-widget .flysas-form select {\n      font-size: 14px !important;\n      font-family: scandinavian !important;\n      padding: 16px 14px 0 !important;\n    }\n\n    .flysas-map-modal .flysas-widget.lowprice-calendar .planner-table th,\n    .flysas-map-modal .flysas-widget.lowprice-calendar .planner-table td {\n      height: 36px !important;\n    }\n  </style>\n  <div class=\"flysas-map\"></div>\n  <div class=\"flysas-map-modal\">\n    <div class=\"flysas-widget lowprice-calendar\"></div>\n  </div>\n";

var FlysasDestinationMap = /*#__PURE__*/function (_HTMLElement) {
  _inherits(FlysasDestinationMap, _HTMLElement);

  function FlysasDestinationMap() {
    _classCallCheck(this, FlysasDestinationMap);

    console.log("constructor");
    return _possibleConstructorReturn(this, _getPrototypeOf(FlysasDestinationMap).call(this));
  }

  _createClass(FlysasDestinationMap, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      console.log("connectedCallback");
      this.appendChild(document.importNode(template.content, true));
      this.mapElem = this.querySelector(".flysas-map");
      this.modalElem = this.querySelector(".flysas-map-modal");
      this.plannerElem = this.querySelector(".flysas-widget");
      this.init();
      this.modalElem.addEventListener("click", this.closeModal.bind(this));
    }
  }, {
    key: "init",
    value: function init() {
      this.map = new google.maps.Map(this.mapElem, {
        center: {
          lat: 51.165691,
          lng: 10.451526
        },
        zoom: 3,
        mapTypeId: "sas_style",
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DEFAULT,
          mapTypeIds: ["sas_style", google.maps.MapTypeId.SATELLITE]
        },
        streetViewControl: false,
        scrollwheel: false
      });
      this.map.mapTypes.set("sas_style", this.getMapStyles());
      this.style.opacity = 1;
    }
  }, {
    key: "getMapStyles",
    value: function getMapStyles() {
      var styles = [{
        "elementType": "geometry",
        "stylers": [{
          "color": "#eae9e8"
        }]
      }, {
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#3f3d3a"
        }]
      }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#eae9e8"
        }]
      }, {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#eae9e8"
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#eae9e8"
        }]
      }, {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#3f3d3a"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e5e5e5"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#9e9e9e"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f4f4f4"
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#3f3d3a"
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f4f4f4"
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#3f3d3a"
        }]
      }, {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#f4f4f4"
        }]
      }, {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#0087f5"
        }]
      }, {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#0087f5"
        }]
      }];
      return new google.maps.StyledMapType(styles, {
        name: "SAS Map"
      });
    }
  }, {
    key: "setMarkers",
    value: function setMarkers() {
      var _this = this;

      var _loop = function _loop(i) {
        var marker = new google.maps.Marker({
          icon: {
            url: "http://localhost:3000/assets/icons-flags/raw/flag--".concat(_this.countries.items[i].code, ".svg"),
            size: new google.maps.Size(24, 24),
            scaledSize: new google.maps.Size(24, 24)
          },
          position: _this.countries.items[i].position,
          map: _this.map
        });
        marker.item = _this.countries.items[i];
        marker.addListener("click", function (event) {
          return _this.openModal(event, marker);
        });
      };

      for (var i = 0; i < this.countries.items.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: "openModal",
    value: function openModal(event, marker) {
      this.plannerElem.innerHTML = "";
      this.plannerElem.setAttribute("data-destination", marker.item.name.toLowerCase().replace(/\s/gi, ""));
      window.flysasApp.planner.widget.initWidget();
      this.modalElem.classList.add("open");
    }
  }, {
    key: "closeModal",
    value: function closeModal(event) {
      if (event.target.classList.contains("departures")) {
        return;
      }

      this.modalElem.classList.remove("open");
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldVal, newVal) {
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      console.log("render");
      this.setMarkers();
    }
  }, {
    key: "countries",
    get: function get() {
      return JSON.parse(this.getAttribute("countries"));
    },
    set: function set(value) {
      this.setAttribute("countries", JSON.stringify(value));
    }
  }, {
    key: "country",
    get: function get() {
      return this.getAttribute("country");
    },
    set: function set(value) {
      this.setAttribute("country", value);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ["countries", "country"];
    }
  }]);

  return FlysasDestinationMap;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

window.customElements.define("flysas-destination-map", FlysasDestinationMap);