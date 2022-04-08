import UserDetails from "components/user/UserDetails";

export default class UserItem extends HTMLElement{

  static get observedAttributes() {
    return ['showDetails', 'user', 'key'];
  }

  /**
   * construct user item DOM element
   * @param {string} key element unique identifier
   * @param {Object} user object that contains at least {name: string}
   */
  constructor(user){
    super();
    this.attachShadow({mode: "open"});

    this.key = `${user.name}-${user.id}-${new Date().getTime()}`;
    this.user = {...user};
    this.showDetails = false;
    this.details = new UserDetails(this.user);
    this.details.classList.add(this.key);
  }

  connectedCallback(){
    this.render();
  }

  /**
   * TODO unused
   * @param {string} name changed attribute name
   * @param {string} oldValue 
   * @param {string} newValue 
   */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("UPDATE", name, oldValue, newValue);
    this.render();
  }

  /**
   * TODO remove item
   * dispatch "remove" event
   * @param {HTMLElement} el 
   */
  removeHandler(el){
    const removeEvent = new Event("remove", {el: this, data: {...this.user}});
    el.addEventListener("click", () => {
      this.dispatchEvent(removeEvent)
    });
  }

  /**
   * user details infos
   */
  _addDetails(){
    if(this.showDetails){
      this.shadowRoot.appendChild(this.details);
    }
    else{
      this.details.remove();
    }
  }

  _addStyles(){
    const style = document.createElement("style");
    style.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .user-link {
        color: rgb(227, 134, 14);
        text-decoration: none;
      }
      user-item:defined {
        color: rgb(227, 134, 14);
        text-transform: uppercase;
      }
    `;
    this.shadowRoot.appendChild(style);
  }

  /**
   * Create anchor that wrap user name
   */
  _addUserLinkName(){
    const link = document.createElement("A");
    
    link.setAttribute("href", "#");
    link.setAttribute("class", "user-link");
    link.addEventListener("click", (e) =>{
      e.preventDefault();
      e.stopPropagation();
      this.showDetails = !this.showDetails;
      this._addDetails();
    });
    link.innerText = this.user.name;
    this.shadowRoot.appendChild(link);
  }

  /**
   * Render the current customElement into DOM
   */
   render(){
    const classes = ["user-item" /*, this.showDetails? "details-opened": ""*/];
    this.setAttribute("class", classes.join(" "));
    this.setAttribute("id", `user-${this.user.id}`);
    this._addUserLinkName();
    this._addStyles();
    this._addDetails();
  }

}

customElements.define("user-item", UserItem);