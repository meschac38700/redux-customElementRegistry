export default class InputField extends HTMLElement {

  #name = "";
  #value = null;
  #observer = null;
  #type = "text";
  #id = null;
  #label = null;
  #placeholder = null;

  static get observedAttributes() {
    return ['value'];
  }

  /**
   * 
   * @param {string} label input label
   * @param {str} type input type
   * @param {Any} value default value
   * @param {string} placeholder 
   */
  constructor({type="text", name=null, id=null, value=null, label=null, placeholder=null} = {}){
    super();

    this.attachShadow({mode: "open"});
    this._initObserver();

    this.name = name ?? this.getAttribute("name");
    this.type = type ?? this.getAttribute("type");
    this.id = id ?? this.getAttribute("id") ?? `${this.constructor.name.toLowerCase()}-${new Date().getTime()}`
    this.value = value  ?? this.getAttribute("value") ?? "";
    this.label = label ?? this.getAttribute("label") ?? "";
    this.placeholder = placeholder  ?? this.getAttribute("placeholder") ?? "";

    this.wrapper = document.createElement("DIV");
    this.wrapper.setAttribute("class", "field-wrapper");

    this.input = document.createElement("INPUT");
    this.input.type = this.type;
  }

  _addInput(){
    this.input.classList.add("field-input");
    this.input.setAttribute("id", this.id);
    this.input.value = this.value;
    this.input.placeholder = this.placeholder ?? "";
    this._emitInputChanges();
    this.wrapper.appendChild(this.input);
  }

  _emitInputChanges(){
    const changeEvent = new CustomEvent("change", {detail: {el: this, value: () => this.input.value}});
    this.input.addEventListener("input", (e)=> {
      this.value = this.input.value;
      this.dispatchEvent(changeEvent)
    })
  }

  _addLabel(){
    const label = document.createElement("LABEL");
    label.setAttribute("for", this.id);
    label.setAttribute("class", "field-label");
    label.innerText = this.label;
    this.wrapper.appendChild(label);
  }

  get getValue(){
    return this.value;
  }

  get observerInstance(){
    return this.observer;
  }

  get __styles(){
    return `
      *, *:before, *after{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .field-wrapper {
        display: flex;
        flex-direction: column;
        gap: .8rem;
        background-color: #081724;
        border-radius: 4px;
        border: 1px solid #081724;
        box-shadow: 0 4px 8px #081724;
        gap: .2rem;
        width: 100%;
        max-width: 100%;
        padding: 0;
        margin: 0 0 1rem 0;
        color: #ccc;
      }
      .field-input{
        padding: .6em .4rem;
        outline: none;
        border-radius: 0.2em;
        background: #03080d;
        border: 1px solid #081724;
        color: inherit;
      }
      .field-label{
        font-weight: 600px;
      }
    `
  }

  _addStyles(){
    const style = document.createElement("STYLE");
    style.textContent = this.__styles
    this.shadowRoot.appendChild(style);
  }

  _initObserver(){
    this.observer = new Proxy(this,{
      set(self, key, value ){
        if(self.hasOwnProperty(key)){
          self[key] = value;
          if(key === "value"){
            self.input.value = value;
          }
        }
        return true;
      },
      get(self, key){
        if(self.hasOwnProperty(key))
          return self[key];
        return null;
      }
    });
  }

  /**
   * Update field value
   * @param {Any} param0 new input value
   * @param {Function} callback function to execute after change
   */
  setValue(newValue="", callback=({name, value}) => ({name, value})){
    this.observer.value = newValue;
    // inject the current field name and the value
    callback({name: this.name, value: newValue});
  }

  /**
   * TODO unused
   * @param {string} name changed attribute name
   * @param {string} oldValue 
   * @param {string} newValue 
   */
   attributeChangedCallback(name, oldValue, newValue) {
    const field = this.wrapper.querySelector(".field-input");
    if(name === "value" && oldValue !== newValue && !!field){
      this.wrapper.querySelector(".field-input").value = newValue
    }
  }

  connectedCallback(){
    this.render();
  }

  disconnectedCallback(){
    this.textContent = "";
    this.remove();
  }

  render(){
    this._addStyles();

    if(this.label){
      this._addLabel();
    }

    this._addInput();

    this.shadowRoot.appendChild(this.wrapper);
  }
}

customElements.define("input-field", InputField);