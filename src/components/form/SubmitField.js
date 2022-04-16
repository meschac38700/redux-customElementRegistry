export default class SubmitField extends HTMLElement {
  #label;

  static get observedAttributes() {
    return ['value'];
  }

  constructor({label=null}){
    super();
    this.label = label ?? this.getAttribute("label") ?? "";
    this.button = document.createElement("BUTTON");
    this.button.setAttribute("id", `button-${new Date().getTime()}`);
    this.button.setAttribute("class", `btn submit-btn`);
    this.button.innerText = this.label;
  }

  _addStyles(){
    const style = document.createElement("STYLE");
    style.textContent = `
      submit-field{
        display: inline-block;
        background-color: rgb(46, 138, 138);
        border-radius: .2em;
      }
      submit-field:hover{
        background-color: rgb(36, 101, 101);
      }
      .submit-btn{
        background-color: transparent;
        color: white;
        font-weight: 600;
        align-self: center;
        padding: .6rem 2rem;
        cursor: pointer;
        border: none;
      }
      
      .clicked{
        background-color: #a8aaa9 !important;
      }
    `;
    this.appendChild(style);
  }

  _emitSubmitEvent(){
    const submitEvent = new CustomEvent("submit");
    
    this.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.classList.add("clicked");
    });

    this.addEventListener("mouseup", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        this.classList.remove("clicked");
      }, 250);
      this.dispatchEvent(submitEvent);
    });
  }

  __triggerEvent(node, eventName){
    const clickEvent = new Event(eventName, {"bubbles":true, "cancelable":true});
    node.dispatchEvent(clickEvent);
  }

  click(){
    //--- Simulate a natural mouse-click sequence.
    this.__triggerEvent (this, "mouseover");
    this.__triggerEvent (this, "mousedown");
    this.__triggerEvent (this, "mouseup");
    this.__triggerEvent (this, "click");
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
    this.appendChild(this.button);
  }
}
customElements.define("submit-field", SubmitField )