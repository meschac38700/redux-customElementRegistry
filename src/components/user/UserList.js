import UserItem from "components/user/UserItem";

export default class UserList extends HTMLElement{

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
    this.users = users ?? this.getAttribute("users") ?? [];
    this.users = this._parseUsers;
    this.userList = document.createElement("DIV");
    this.userList.setAttribute("class", "user-list");
  }

  get _parseUsers(){
    try{
      if(Array.isArray(this.users)) 
        return this.users;

      const data = JSON.parse(this.users);
      if(Array.isArray(data)){
        return data;
      }
      throw new SyntaxError("Error while parsing users list: 'users' attributes must be a list");
    }catch(e){
      console.error(e.message)
    }
    return [];
  }

  get _styles(){
    const style = document.createElement("style");
    style.textContent = `
      *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .user-list{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: .4em;
        padding: 1em 0;
        margin: 0;
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
    this.render();
  }


  /**
   * Append a single user
   * @param {Object} pUser to append in the current list
   */
  appendUser(pUser){
    const alreadyExists = this._parseUsers.some(user => user.id === pUser.id)
    if(alreadyExists){
      throw new Error(`User already exists: ${JSON.stringify(pUser)}`)
    }
    this.userList.appendChild(new UserItem(pUser));
    this.users = [...this.users, pUser];
  }
  /**
   * append multiple users
   * @param {Array} users list of user to append in the current list
   */
  appendUsers(users){
    const currentUserIDs = this._parseUsers.map(user => user.id);
    const newUsers = users.filter(user=> !currentUserIDs.includes(user.id) )
    newUsers?.forEach(user => this.appendUser(user));
  }

  /**
   * Render the current customElement into DOM
   */
  render(){
    this.userList.setAttribute("id", `user-list`);
    this.userList.append(
      ...this.users.map(user => (new UserItem(user)))
    );
    this.shadowRoot.appendChild(this._styles);
    this.shadowRoot.appendChild(this.userList);
  }

}

customElements.define("user-list", UserList);