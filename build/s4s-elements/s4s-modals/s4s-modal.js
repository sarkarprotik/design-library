!function(e,t,i){class s extends S4SBase{constructor(){super()}connectedCallback(){this.init(i.templates.modal),this.elements.close.addEventListener("click",e=>this.setAttribute("hidden",!0)),this.getAttribute("heading")?this.elements.heading.innerText=this.getAttribute("heading"):this.elements.heading.parentNode.removeChild(this.elements.heading),e.addEventListener("modalVisibility",e=>{e.detail.id===this.getAttribute("modal-id")&&this.toggleAttribute("hidden",!e.detail.visible)})}}e.customElements.define("s4s-modal",s)}(window,document,window.s4s);