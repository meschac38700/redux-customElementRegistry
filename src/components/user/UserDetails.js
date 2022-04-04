export default class UserDetails extends HTMLDivElement {
  /**
   * 
   * @param {Object} user contains at least {name: string, description: string}
   */
  constructor(user){
    super();
    this.user = {...user};
  }


  render(){
    const title = document.createElement("H4");
    title.setAttribute("class", "title user-name");
    title.setAttribute("id", `${this.user.id}-${this.user.name}-title`);
    title.innerText = this.user.name;
    const description = document.createElement("P");
    title.setAttribute("class", "description");
    description.setAttribute("id", `${this.user.id}-${this.user.name}-description`);
    description.innerText = this.user.description;

    this.setAttribute("class", "user-details");
    this.appendChild(title);
    this.appendChild(description);

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

customElements.define("user-details", UserDetails, {extends: 'div'});