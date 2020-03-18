const template = document.createElement("template")
template.innerHTML = `
  <style>
    flysas-destination-map {
      position: fixed;
      z-index: 3;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 1s;
    }

    .flysas-map {
      width: 100%;
      height: 100%;
    }

    .flysas-map-modal {
      position: fixed;
      z-index: 4;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .5);
      display: none;
    }

    .flysas-map-modal.open {
      display: flex;
      flex-flow: column;
      justify-content: center;
    }

    .flysas-map-modal .flysas-widget {
      background: #fff;
      overflow: auto;
    }

    .flysas-map-modal .flysas-widget .col-form-destinations,
    .flysas-map-modal .flysas-widget .btn-back,
    .flysas-map-modal .flysas-widget .btn-forward,
    .flysas-map-modal .flysas-widget .planner-description,
    .flysas-map-modal .flysas-widget .planner-country {
      display: none !important;
    }

    .flysas-map-modal .flysas-widget .planner-city {
      font-size: 14px !important;
      font-family: scandinavian !important;
    }

    .flysas-widget.lowprice-calendar .planner-header-top thead th {
      font-family: scandinavian !important;
      font-weight: 700 !important;
    }

    .flysas-map-modal .flysas-widget .planner-container {
      padding-top: 16px !important;
    }

    .flysas-map-modal .flysas-widget .planner-top .planner-container {
      padding: 0 !important;
    }

    .flysas-map-modal .flysas-widget .sas-input {
      height: 52px !important;
      margin: 0 !important;
    }

    .flysas-map-modal .flysas-widget .flysas-form select {
      font-size: 14px !important;
      font-family: scandinavian !important;
      padding: 16px 14px 0 !important;
    }

    .flysas-map-modal .flysas-widget.lowprice-calendar .planner-table th,
    .flysas-map-modal .flysas-widget.lowprice-calendar .planner-table td {
      height: 36px !important;
    }
  </style>
  <div class="flysas-map"></div>
  <div class="flysas-map-modal">
    <div class="flysas-widget lowprice-calendar"></div>
  </div>
`
class FlysasDestinationMap extends HTMLElement {
  constructor() {
    console.log("constructor")

    super()
  }

  connectedCallback() {
    console.log("connectedCallback")

    this.appendChild(document.importNode(template.content, true))
    this.mapElem = this.querySelector(".flysas-map")
    this.modalElem = this.querySelector(".flysas-map-modal")
    this.plannerElem = this.querySelector(".flysas-widget")
    this.init()

    this.modalElem.addEventListener("click", this.closeModal.bind(this))
  }

  init() {
    this.map = new google.maps.Map(this.mapElem, {
      center: { lat: 51.165691, lng: 10.451526 },
      zoom: 3,
      mapTypeId: "sas_style",
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DEFAULT,
        mapTypeIds: ["sas_style", google.maps.MapTypeId.SATELLITE]
      },
      streetViewControl: false,
      scrollwheel: false
    })
    this.map.mapTypes.set("sas_style", this.getMapStyles())
    this.style.opacity = 1;
  }

  getMapStyles() {
    const styles = [{"elementType":"geometry","stylers":[{"color":"#eae9e8"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#3f3d3a"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#eae9e8"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#eae9e8"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eae9e8"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#3f3d3a"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f4f4f4"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#3f3d3a"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f4f4f4"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#3f3d3a"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#f4f4f4"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0087f5"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#0087f5"}]}]

    return new google.maps.StyledMapType(styles, {name: "SAS Map"})
  }

  setMarkers() {
    for (let i = 0; i < this.countries.items.length; i++) {
      const marker = new google.maps.Marker({
        icon: {
          url: `http://localhost:3000/assets/icons-flags/raw/flag--${this.countries.items[i].code}.svg`,
          size: new google.maps.Size(24, 24),
          scaledSize: new google.maps.Size(24, 24)
        },
        position: this.countries.items[i].position,
        map: this.map
      })
      marker.item = this.countries.items[i]

      marker.addListener("click", event => this.openModal(event, marker))
    }
  }

  openModal(event, marker) {
    this.plannerElem.innerHTML = "";
    this.plannerElem.setAttribute("data-destination", marker.item.name.toLowerCase().replace(/\s/gi, ""))
    window.flysasApp.planner.widget.initWidget()
    this.modalElem.classList.add("open")
  }

  closeModal(event) {
    if (event.target.classList.contains("departures")) {
      return
    }
    this.modalElem.classList.remove("open")
  }

  get countries() {
    return JSON.parse(this.getAttribute("countries"))
  }

  set countries(value) {
    this.setAttribute("countries", JSON.stringify(value))
  }

  get country() {
    return this.getAttribute("country")
  }

  set country(value) {
    this.setAttribute("country", value)
  }

  static get observedAttributes() {
    return ["countries", "country"]
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render()
  }

  render() {
    console.log("render")

    this.setMarkers()
  }
}
window.customElements.define("flysas-destination-map", FlysasDestinationMap)
