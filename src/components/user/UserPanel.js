import UserItem from "components/user/UserItem";

/**
 * List of users
 */
export default class UserPanel extends HTMLElement{

  #users = [];

  /**
   * @param {Array} users, list of users showed in the panel
   */
  constructor({users=[]}={}){
    super();
    this.attachShadow({mode: "open"});

    // TODO extract in private method
    this.users = users ? [...users] : JSON.parse(this.getAttribute("users")) ?? [];
    this.panel = document.createElement("DIV");
    this.panel.classList.add("user-panel");
    this.panelContent = document.createElement("DIV");
    this.panelContent.setAttribute("class", "user-panel__content");
  }


  _addStyles(){
    const style = document.createElement("STYLE");
    style.textContent = `
      .user-panel{
        position: absolute;
        width: 500px;
        max-width: 80%;
        height: 100%;
        top: 0;
        left: 0;
        transform: translateX(-100%);
        background: #12285b;
        transition: transform .5s ease-in-out;
        display: flex;
        flex-direction: column;
      }
      .user-panel.opened{
        transform: translateX(0);
      }
      .user-panel__content{
        overflow-y: auto;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 0 .8em 1em .8em;
        overflow-x: hidden;
      }
      .close-wrapper{
        position: relative;
        height: 40px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 .8em;
      }
      .close-btn{
        display: inline-block;
        width: 20px;
        height: 20px;
        font-size: 20px;
        color: #d98383;
        cursor: pointer;
        transform: translateX(calc(100% + .8em));
        flex: none;
      }
      .user-panel.opened .close-btn{
        color: #ccc;
        transform: rotate(180deg);
      }
      .close-btn:hover{
        color: #6f84f4;
      }
    `

    // TODO overlay 
    this.shadowRoot.appendChild(style);
  }

  _addCloseButton(){
    const closeWrapper = document.createElement("DIV");
    closeWrapper.setAttribute("class", "close-wrapper");
    const close = document.createElement("SPAN");
    close.setAttribute("class", "close-btn");
    close.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32zM342.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L242.8 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C355.1 266.1 355.1 245.9 342.6 233.4z"/></svg>`;

    close.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.panel.classList.toggle("opened");
    })
    closeWrapper.appendChild(close);
    this.panel.appendChild(closeWrapper);
  }

  /**
   * 
   * @param {Array} users to append in the panel
   */
  appendUsers(users){
    // filters user already in
    const currentUserIDs = this.users.map(user => user.id);
    const newUsers = users.filter(user => !currentUserIDs.includes(user.id));
    this.users = [...this.users, ...newUsers];
    newUsers.forEach(user => {
      this.panelContent.appendChild(new UserItem(user));
    })

  }

  connectedCallback(){
    this.render();
  }

  render(){
    this._addStyles();
    this._addCloseButton();
    this.panel.appendChild(this.panelContent);
    this.shadowRoot.appendChild(this.panel);
  }

}

customElements.define("user-panel", UserPanel);