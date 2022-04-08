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
    this.shadowRoot.textContent = "";
    this.remove();
  }

  _addStyles(){
    const style = document.createElement("STYLE");
    style.textContent = `
      * {
        margin: 0;
        padding: 0;
      }
      #details-wrapper {
        position: relative;
      }
      user-details:defined {
        box-sizing: border-box;
        color: #ccc;
        padding: .8em;
        padding-left: 1em;
        border-radius: .4em;
        text-transform: none;
        display: flex;
        flex-direction: column;
        gap: 1em 0;
        cursor: default;
        
      }
      .user-details{
        margin: .8em 0 0 .8em;
        display: flex;
        flex-direction: column;
        gap: .8em 0;
      }

    `;
    this.shadowRoot.appendChild(style);
  }

  render(){
    const wrapper = document.createElement("DIV");
    wrapper.setAttribute("class", "details-wrapper");
    wrapper.setAttribute("id", "details-wrapper");
    const div = document.createElement("DIV");
    const title = document.createElement("H4");
    title.setAttribute("class", "title user-name");
    title.setAttribute("id", `${this.user.id}-${this.user.name}-title`);
    title.innerText = `What's about ${this.user.name}`;
    const description = document.createElement("P");
    title.setAttribute("class", "description");
    description.setAttribute("id", `${this.user.id}-${this.user.name}-description`);
    description.innerText = this.user.description;

    div.setAttribute("class", "user-details");
    div.appendChild(title);
    div.appendChild(description);
    wrapper.appendChild(div);
    this._addStyles();
    this.shadowRoot.appendChild(wrapper);
  }

}

customElements.define("user-details", UserDetails);