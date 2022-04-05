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
    this.link = this._createLink();
  }

  get _styles(){
    const style = document.createElement("style");
    style.textContent = `
      *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      a{
        color: inherit;
        text-decoration: none;
      }
      .user-item{
        position: relative;
        color: rgb(227, 134, 14);
        text-transform: uppercase;
      }
    `;
    return style;
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
   * Render the current customElement into DOM
   */
  render(){
    const div = document.createElement("div");
    const classes = ["user-item" /*, this.showDetails? "details-opened": ""*/];
    div.setAttribute("class", classes.join(" "));
    div.setAttribute("id", `user-${this.user.id}`);
    div.appendChild(this.link);
    this.shadowRoot.appendChild(this._styles);
    this.shadowRoot.appendChild(div);
    this._addDetails();
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

  /**
   * Create anchor that wrap user name
   */
  _createLink(){
    const link = document.createElement("A");
    
    link.setAttribute("href", "#");
    link.setAttribute("class", "user-link");
    link.addEventListener("click", (e) =>{
      e.preventDefault();
      e.stopPropagation();
      this.showDetails = !this.showDetails;
      this._addDetails();
    });
    link.onblur = () => {
      this.showDetails = false;
      this._addDetails();
    };
    link.innerText = this.user.name;
    return link;
  }

}

customElements.define("user-item", UserItem);