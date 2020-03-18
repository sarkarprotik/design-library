var localScript = "http://localhost:3000/assets/js/components/sas-main-header/widget.js";
var prodScript = "https://www.sas.se/v2/de-design-library/assets/js/components/sas-main-header/widget.js";
(function(d, src) {
  var s = d.createElement("script");
  s.async = true;
  s.src = src;
  d.head.appendChild(s);
})(document, prodScript);

document.querySelector(".notification").style.display = "none";
document.getElementById("sas-header-wrapper").style.display = "none";
