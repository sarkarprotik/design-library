const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
      padding: 8px;
    }
    xbutton {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
      cursor: pointer;
    }
  </style>
  <div class="container">
    <button class="btn">Label</button>
  </div>
`;
class Button extends HTMLElement {
  constructor() {
    console.log("constructor")

    super();
    this._shadowRoot = this//.attachShadow({ mode: 'open' });
    //this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._shadowRoot.innerHTML = template.innerHTML

    this.$button = this._shadowRoot.querySelector('button');
    this.$button.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('onBtnClick', {
          detail: 'Hello from within the Custom Element',
        })
      );
    });
  }

  connectedCallback() {
    console.log("connectedCallback")

    if (this.hasAttribute('as-atom')) {
      //this.$container.style.padding = '0px';
    }
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    console.log("render")

    this.$button.innerHTML = this.label;
  }
}
window.customElements.define('my-button', Button);
