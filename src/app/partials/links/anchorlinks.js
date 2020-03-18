var flysasLibrary = window.flysasLibrary || {};
flysasLibrary.anchorlinks = flysasLibrary.anchorlinks || (function(window, document, location) {
  "use strict";

  let anchorlinks = document.querySelectorAll('a[href^="#"]')

  for (let item of anchorlinks) {
    item.addEventListener('click', (e)=> {
      let hashval = item.getAttribute('href')
      let target = document.querySelector(hashval)
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      history.pushState(null, null, hashval)
      e.preventDefault()
    })
  }

})(window, document, window.location);
