import InputField from "./InputField";

export default class TextareaField extends InputField {

  constructor({name=null, value=null, label=null, placeholder=null}={}){
    super({type:null, name, value, label, placeholder});

    this.input = document.createElement("TEXTAREA");
    this.input.classList.add("field-area");
  }

  get __styles(){
    return `
      ${super.__styles}
      .field-area{
        resize: vertical;
        min-height: 200px;
      }
    `;
  }
}

customElements.define("textarea-field", TextareaField);