import UserItem from "components/user/UserItem";

export default class usersList extends HTMLElement{

  static get observedAttributes() {
    return ['users'];
  }

  /**
   * construct user item DOM element
   * @param {string} key element unique identifier
   * @param {Object} user object that contains at least {name: string}
   */
  constructor(users){
    super();
    this.attachShadow({mode: "open"});
    this.users = this._parseUsers(users ?? this.getAttribute("users") ?? []);
    // this.usersList = document.createElement("DIV");
    // this.usersList.setAttribute("class", "user-list");
  }


  get usersList(){
    return this.shadowRoot;
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
    this.render();
  }

  /**
   * append some new users
   * @param  {...any} users new users to add
   */
  push(...users){
    // filter already exists
    const alreadyExist = this.users.map(user => user.id);
    const newUsers = users.filter(user => !alreadyExist.includes(user.id));
    this.users = [...this.users, ...newUsers];
    this._updateRendering(newUsers)
  }

  /**
 * parse users list
 * @param {Array | String} users 
 * @returns 
 */
    _parseUsers(users){
    try{
      if(Array.isArray(users)) 
        return users;

      const data = JSON.parse(users);
      if(Array.isArray(data)){
        return data;
      }
      throw new SyntaxError("Error while parsing users list: 'users' attributes must be a list");
    }catch(e){
      console.error(e.message)
    }
    return [];
  }

  _addStyles(){
    const style = document.createElement("style");
    style.textContent = `
      *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      user-list:defined{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: .4em;
        padding: 1em 0;
        margin: 0;
      }
    `;
    this.appendChild(style);
  }

  /**
   * Update DOM users list
   * @param {Array} newUsers new users to append to the DOM
   */
  _updateRendering(newUsers){
    newUsers.forEach(newUser => 
      this.usersList.appendChild(new UserItem(newUser))
    );
  }

  /**
   * Render the current customElement into DOM
   */
  render(){
    this.setAttribute("id", `user-list`);
    this.setAttribute("class", "user-list");
    this._addStyles();
    this.usersList.append(
      ...this.users.map(user => (new UserItem(user)))
    );
  }

}

customElements.define("user-list", usersList);