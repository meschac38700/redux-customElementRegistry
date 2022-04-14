export default class SubmitField extends HTMLElement {
  #label;

  static get observedAttributes() {
    return ['value'];
  }

  constructor({label=null}){
    super();
    this.attachShadow({mode: "open"});
    this.label = label ?? this.getAttribute("label") ?? "";
    this.button = document.createElement("BUTTON");
    this.button.setAttribute("id", `button-${new Date().getTime()}`);
    this.button.setAttribute("class", `btn submit-btn`);
    this.button.innerText = this.label;
  }

  _addStyles(){
    const style = document.createElement("STYLE");
    style.textContent = `
      .submit-btn{
        background-color: rgb(46, 138, 138);
        color: white;
        font-weight: 600;
        align-self: center;
        padding: .6rem 2rem;
        border: none;
        border-radius: .4em;
        cursor: pointer;
        transition: background-color .3s ease-in-out;
      }
      button-field:hover{
        background-color: rgb(25, 73, 73);
      }
    `;
    this.shadowRoot.appendChild(style);
  }

  _emitSubmitEvent(){
    const submitEvent = new CustomEvent("submit");
    this.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.dispatchEvent(submitEvent);
    });

    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.dispatchEvent(submitEvent);
    })
  }

  /**
   * TODO unused
   * @param {string} name changed attribute name
   * @param {string} oldValue 
   * @param {string} newValue 
   */
   attributeChangedCallback(name, oldValue, newValue) {
    const field = this.wrapper.querySelector(".field-input");
    if(name === "label" && oldValue !== newValue && !!field){
      this.button.innerText = newValue;
    }
  }

  connectedCallback(){
    this.render();
  }

  render(){
    this._emitSubmitEvent();
    this._addStyles();
    this.shadowRoot.appendChild(this.button);
  }
}
customElements.define("submit-field", SubmitField )