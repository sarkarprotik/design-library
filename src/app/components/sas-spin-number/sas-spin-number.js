window.flysasLibrary = window.flysasLibrary || {}
flysasLibrary.sasSpinNumber = (function(window, document) {
  "use strict"

  const spinningNumbersElem = document.querySelector(".spinning-numbers")
  if (!spinningNumbersElem) {
    return
  }

  const startDigits = spinningNumbersElem.getAttribute("data-digits")
  const numberOfDigits = startDigits.length || 5
  const firstNumberElem = document.createElement("div")
  const elemHTML = spinningNumbersElem.firstElementChild.outerHTML
  spinningNumbersElem.innerHTML = ""

  for (let i = 0; i < numberOfDigits; i++) {
    firstNumberElem.innerHTML = elemHTML
    const numberElem = firstNumberElem.firstElementChild
    spinningNumbersElem.appendChild(numberElem)
    const digit = +startDigits[i] || 10
    numberElem.querySelector(".numbers").style.top = "-" + (digit - 1) + "em"
  }


  const allNumberElems = spinningNumbersElem.querySelectorAll(".numbers")

  const spin = (digits) => {
    if (!digits) {
      const multiplier = "10000000000".substring(0, allNumberElems.length)
      digits = Math.floor(Math.random() * (+multiplier))
    }
    digits = "0000000000" + digits
    digits = digits.substring(digits.length - allNumberElems.length)

    for (let i = 0; i < allNumberElems.length; i++) {
      const topPos = +digits[i] || 10
      allNumberElems[i].style.top = "-" + (topPos - 1) + "em"
    }
  }

  return {spin}
})(window, document);
