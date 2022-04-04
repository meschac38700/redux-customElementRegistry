import UserDetails from "components/user/UserDetails";

export default class UserItem extends HTMLLIElement{

  static get observedAttributes() {
    return ['showDetails', 'user', 'key'];
  }

  /**
   * construct user item DOM element
   * @param {string} key element unique identifier
   * @param {Object} user object that contains at least {name: string}
   */
  constructor(key, user){
    super();
    this.key = `${key}-${new Date().getTime()}`;
    this.user = {...user};
    this.showDetails = false;
    this.details = new UserDetails(this.user);
    this.details.classList.add(this.key);
    this.link = this._createLink();
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
    const classes = ["user-item" /*, this.showDetails? "details-opened": ""*/];
    this.setAttribute("class", classes.join(" "));
    this.setAttribute("id", `user-${this.user.id}`);
    this.appendChild(this.link);
    this._addDetails();
  }

  /**
   * user details infos
   */
   _addDetails(){
    if(this.showDetails){
      this.appendChild(this.details);
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
    
    link.onblur = () => {
      this.showDetails = false;
      this._addDetails();
    };
    link.addEventListener("focusin", (e) => {
      this.showDetails = true;
      this._addDetails();
    });
    link.innerText = this.user.name;
    return link;
  }

}

customElements.define("user-item", UserItem, {extends: "li"});