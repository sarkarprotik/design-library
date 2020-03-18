window.flysasLibrary = window.flysasLibrary || {}
flysasLibrary.sasFlipNumber = (function(window, document) {
  "use strict"

  function flysasTimer(timerElem, props) {
    let timer = null;
    let startDate
    let endDate
    let diff
    let days
    let hours
    let minutes
    let seconds
    let nextDays
    let nextHours
    let nextMinutes
    let nextSeconds
    let key
    let i = 0
    let infinite = true
    let func = setClockVars

    let flipContainerElem
    let daysElem
    let hoursElem
    let minutesElem
    let secondsElem

    function declareElems() {
      flipContainerElem = timerElem.querySelector(".flip-clock")
      daysElem = timerElem.querySelector(".flip-clock__days")
      hoursElem = timerElem.querySelector(".flip-clock__hours")
      minutesElem = timerElem.querySelector(".flip-clock__minutes")
      secondsElem = timerElem.querySelector(".flip-clock__seconds")
    }

    function reset() {
      flipContainerElem.classList.remove("show")
      daysElem.style.display = "none"
      diff = undefined

      setTime(daysElem, "00", "00")
      setTime(hoursElem, "00", "00")
      setTime(minutesElem, "00", "00")
      setTime(secondsElem, "00", "00")
    }

    function getDigit(digit) {
      return ("0" + digit).substring(("0" + digit).length - 2)
    }

    function getParsedDate(isoDate) {
      if (typeof isoDate === "object") {
        return isoDate
      }
      const dateParts = isoDate.match(/\d+/gi)
      const parsedDate = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2], +dateParts[3], +dateParts[4], +dateParts[5])
      return parsedDate
    }

    function setTime(elem, currentDigit, nextDigit) {
      if (!elem.querySelector(".card__top")) {
        elem.querySelector(".flip-card").innerText = getDigit(nextDigit)
        return
      }

      elem.querySelector(".card__top").innerText = getDigit(nextDigit)
      elem.querySelector(".card__bottom").setAttribute("data-value", getDigit(currentDigit))
      elem.querySelector(".card__back").setAttribute("data-value", getDigit(currentDigit))
      elem.querySelector(".card__back .card__bottom").setAttribute("data-value", getDigit(nextDigit))
      if (currentDigit !== nextDigit) {
        elem.classList.remove("flip")
        void elem.offsetWidth
        elem.classList.add("flip")
      }
    }

    function setClockVars() {
      const date = new Date()
      const dateNext = new Date(date.getTime() + 1000)

      days = 0
      nextDays = 0
      hours = date.getHours()
      nextHours = dateNext.getHours()
      minutes = date.getMinutes()
      nextMinutes = dateNext.getMinutes()
      seconds = date.getSeconds()
      nextSeconds = dateNext.getSeconds()
    }

    function setCountdownVars() {
      const now = new Date()
      diff = endDate.getTime() - now.getTime()

      seconds = Math.floor(diff / 1000 % 60)
      nextSeconds = (seconds === 0) ? 59 : seconds - 1

      minutes = Math.floor(diff / 1000 / 60 % 60)
      nextMinutes = minutes
      if (seconds === 0) {
        nextMinutes = (minutes === 0) ? 59 : minutes - 1
      }

      hours = Math.floor(diff / 1000 / 60 / 60 % 24)
      nextHours = hours
      if (seconds === 0 && minutes === 0) {
        nextHours = (hours === 0) ? 23 : hours - 1
      }

      days = Math.floor(diff / 1000 / 60 / 60 / 24)
      nextDays = days
      if (seconds === 0 && minutes === 0 && hours === 0) {
        nextDays = (days === 0) ? days : days - 1
      }
    }

    function loop() {
      cancelAnimationFrame(timer)

      if (diff > 1000 || infinite) {
        timer = requestAnimationFrame(loop)
      }

      if (i++ % 20) {
        return
      }

      func()

      if (diff < 1000) {
        return
      }

      if (key !== "" + days + "." + hours + "." + minutes + "." + seconds) {
        setTime(daysElem, days, nextDays)
        setTime(hoursElem, hours, nextHours)
        setTime(minutesElem, minutes, nextMinutes)
        setTime(secondsElem, seconds, nextSeconds)
      }
      key = "" + days + "." + hours + "." + minutes + "." + seconds
    }

    function init() {
      props = props || {}

      declareElems()

      if (!flipContainerElem) {
        return
      }

      reset()

      if (props.startDate && props.endDate) {
        const now = new Date()
        startDate = getParsedDate(props.startDate)
        if (now >= startDate) {
          endDate = getParsedDate(props.endDate)
          diff = endDate.getTime() - now.getTime()
          daysElem.style.display = "inline-block"
          func = setCountdownVars
          infinite = false
        }
      }

      loop()
      flipContainerElem.classList.add("show")
    }

    init()
    //init({startDate:"2019-11-25T12:00:00", endDate:"2019-11-29T22:30:00"})

    return {
      init: init
    }
  }

  var timers = document.querySelectorAll(".flysas-widget.flysas-timer")
  for (var i = 0; i < timers.length; i++) {
    var timerElem = timers[i]
    var props = {}
    if (timerElem.getAttribute("data-minutes")) {
      var now = new Date()
      props.startDate = now
      props.endDate = new Date(now.getTime() + (1000 * 60 * 5))
    }
    new flysasTimer(timerElem, props)
  }
})(window, document);
