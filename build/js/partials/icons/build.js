"use strict";var flysasLibrary;(flysasLibrary=window.flysasLibrary||{}).market=flysasLibrary.market||function(s,a){for(var e,n,t=["/onboard"],o=!1,r="lu",i="en",l={se:"sv",no:"no",dk:"da",fi:"en"},y=a.hostname.match(/^.+\.sas\.(se|no|dk|fi)/gi),c=a.hostname.match(/^.+\.flysas\.com/gi),f=a.pathname.match(/^\/[a-z]{2}-[a-z]{2}(\/|$)/g),d=!!a.pathname.match(/^\/en(\/|$)/g),g=0;g<t.length;g++)o=o||new RegExp(t[g],"i").test(a.pathname);function m(){var s;return y?(e=y[0].replace(/.+\.sas\./gi,""),n=l[e],d&&(n="en")):c&&d||!f?(e=r,n=i):f&&(s=f[0].split("-"),e=(s[0]||"").replace("/",""),n=(s[1]||"").replace("/","")),o?{country:"se",language:"en"}:{country:e||r,language:n||i}}return s.flysasMarket=m(),{getCountryAndLanguage:m}}(window,(document,window.location)),(flysasLibrary=window.flysasLibrary||{}).config=flysasLibrary.config||function(s,a){var e=!!s.location.hostname.match(/^(www|test)\.(fly)?sas\..+/gi),n=!!(s.location.hostname.match(/^(local|192).+/gi)&&"3000"===s.location.port||s.location.hostname.match(/^(de-design-library).+/gi));return{appHostname:e||n?"":"https://www.flysas.com",hostname:"",market:a=a.getCountryAndLanguage()}}(window,(document,flysasLibrary.market)),window.flysasLibrary=window.flysasLibrary||{},flysasLibrary.icons=flysasLibrary.icons||function(s,n,t){var a=s.iconConfig||{default:!0,extra:!1,other:!1,flags:!1},e=!1;function o(a,s){if(!n.getElementById(a)){var e=new XMLHttpRequest;e.open("GET",t.appHostname+s,!0),e.send(),e.onload=function(){var s=n.createElement("div");s.id=a,s.style.display="none",s.setAttribute("hidden",""),s.innerHTML=e.responseText,n.body.appendChild(s)}}}function r(){e||(a.default&&o("flysas-icons-default","/v2/de-design-library/assets/icons/symbol/svg/sprite.symbol.svg"),a.extra&&o("flysas-icons-extra","/v2/de-design-library/assets/icons-extra/symbol/svg/sprite.symbol.svg"),a.other&&o("flysas-icons-other","/v2/de-design-library/assets/icons-other/symbol/svg/sprite.symbol.svg"),a.flags&&o("flysas-icons-flags","/v2/de-design-library/assets/icons-flags/symbol/svg/sprite.symbol.svg"),e=!0)}return r(),{load:r}}(window,document,flysasLibrary.config);