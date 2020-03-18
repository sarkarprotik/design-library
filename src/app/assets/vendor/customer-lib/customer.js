var customerConfig = {
    lang: "sv",
    market: "se", translations: window.flysasCustomer,
    loginCallback: function(err, response) {
        console.log("login")
    },
    logoutCallback: function() {
        console.log("logout")
    },
    accountInfoCallback: function(err, accountInfo) {
        console.log("accountInfo")
    },
    scrollToCep: function() {
        console.log("scrollToCep")
    },
    enableLoginCallback: function(status) {
        console.log("enableLoginCallback")
    },
    skinCode: true
};
var customerConfigLogin = {
    lang: "sv",
    market: "se",
    translations: window.flysasCustomer,
    loginalone: true,
    signupalone:false,
    loginCallback: function(err, response) {
        console.log("login")
    },
    logoutCallback: function() {
        console.log("logout")
    },
    accountInfoCallback: function(err, accountInfo) {
        console.log("accountInfo")
    },
    scrollToCep: function() {
        console.log("scrollToCep")
    },
    enableLoginCallback: function(status) {
        console.log("enableLoginCallback")
    },
    skinCode: true
};
var customerConfigRegister = {
    lang: "sv",
    market: "se",
    translations: window.flysasCustomer,
    loginalone : false,
    signupalone: true,
    loginCallback: function(err, response) {
        console.log("login")
    },
    logoutCallback: function() {
        console.log("logout")
    },
    accountInfoCallback: function(err, accountInfo) {
        console.log("accountInfo")
    },
    scrollToCep: function() {
        console.log("scrollToCep")
    },
    enableLoginCallback: function(status) {
        console.log("enableLoginCallback")
    },
    skinCode: true
};
@@include("../jquery/jquery-3.2.1.min.js");
@@include("customer.min.js");
