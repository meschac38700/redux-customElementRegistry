export default class UserDetails extends HTMLElement {
  /**
   * 
   * @param {Object} user contains at least {name: string, description: string}
   */
  constructor(user){
    super();

    this.attachShadow({mode: 'open'});
    this.user = {...user};
  }


  get _styles(){
    const style = document.createElement("STYLE");
    style.textContent = `
      *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .details-wrapper{
        position: relative;
      }
      .user-details{
        position: absolute;
        bottom: 0;
        transform: translateY(100%);
        z-index: 9;
        color: #ccc;
        background-color: #03080d;
        padding: .8em;
        border-radius: .4em;
        border: 1px solid #081724;
        box-shadow: 0 4px 8px #081724;
        text-transform: none;
        display: flex;
        flex-direction: column;
        gap: 1em 0;
        cursor: default;
      }
    `;
    return style;
  }


  render(){
    const wrapper = document.createElement("DIV");
    wrapper.setAttribute("class", "details-wrapper");
    const div = document.createElement("DIV");
    const title = document.createElement("H4");
    title.setAttribute("class", "title user-name");
    title.setAttribute("id", `${this.user.id}-${this.user.name}-title`);
    title.innerText = this.user.name;
    const description = document.createElement("P");
    title.setAttribute("class", "description");
    description.setAttribute("id", `${this.user.id}-${this.user.name}-description`);
    description.innerText = this.user.description;

    div.setAttribute("class", "user-details");
    div.appendChild(title);
    div.appendChild(description);
    wrapper.appendChild(div);
    this.shadowRoot.appendChild(this._styles);
    this.shadowRoot.appendChild(wrapper);
  }

  clickHandler(){
    this.addEventListener("click", (e)=> {
      e.preventDefault();
      e.stopPropagation();
    })
  }

  connectedCallback(){
    this.render();
    this.clickHandler();
  }

  disconnectedCallback(){
    this.textContent = "";
    this.remove();
  }

}

customElements.define("user-details", UserDetails);