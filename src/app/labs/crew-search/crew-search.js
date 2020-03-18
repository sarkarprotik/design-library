(function(window, document) {
  "use strict";

  var labsProfileCards = document.querySelectorAll(".labs-profile-card");
  labsProfileCards.forEach(card => {
    card.querySelector("input").addEventListener("change", function() {
      card.classList.toggle("selected", this.checked);
    });
  });
})(window, document);
