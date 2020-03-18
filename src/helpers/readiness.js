let appIsLoaded = false

function set(value) {
  appIsLoaded = value ? true : false
}

function get() {
  return appIsLoaded
}

module.exports = {
  get,
  set,
}
