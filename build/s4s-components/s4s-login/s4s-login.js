!function(e,t){class n extends S4SLoggedInCreate{constructor(){super(),this.content=d,this.httpRequest=o}connectedCallback(){this.addLoginElements()}}const s=/(www|test)\.(fly)?sas\.(com|se|no|dk|fi)/gi.test(location.hostname),o=(e,t,n)=>{fetch(s?`/v2/de-design-library/${e}`:`/${e}`,t).then(n)};let d;e.addEventListener("getProfileDone",e=>{200==e.detail.status&&t.querySelector("s4s-login").addLoggedInElements(e.detail.data)}),t.querySelectorAll(".s4s-login-opener").forEach((function(t){t.addEventListener("click",()=>{e.dispatchEvent(new CustomEvent("loginOpenerClicked",{}))})})),e.addEventListener("contentLoaded",()=>{e.customElements.define("s4s-login",n);const s=t.querySelector("s4s-login");s.toggleAttribute("hidden"),s.addEventListener("click",e=>{e.target===s&&s.setAttribute("hidden",!0)})}),e.addEventListener("loginOpenerClicked",()=>{d?t.querySelector("s4s-login").removeAttribute("hidden"):o("s4s-components/content.json",{},t=>t.json().then(t=>{d=t,e.dispatchEvent(new CustomEvent("contentLoaded"))}))})}(window,document);