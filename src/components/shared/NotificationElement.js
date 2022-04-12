export default class NotificationElement extends HTMLElement {

  static get observedAttributes() {
    return ['title', 'message'];
  }

  #identifier = null;
  #observer = null;
  #title = null;
  #message = null;

  constructor({title=null, message=null, id=null}){
    super();
    this.attachShadow({mode:"open"});

    this.identifier = id;
    this.title = title ?? this.getAttribute("title")?? "";
    this.message = message ?? this.getAttribute("message")?? "";
  }


  get observerInstance(){
    return this.observer;
  }

  get getID(){
    return this.identifier;
  }

  _initObserver(){
    this.observer = new Proxy(this, { 
      set(self, key, value){
        if(NotificationElement.observedAttributes.includes(key)){
          self[key] = value;
          // TODO update dom
        }
      },
      get(self, prop){
        return self[prop];
      }
    });
  }

  _addStyles(){
    const style = document.createElement("STYLE");
    style.textContent = `
      *, *:before, *:after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .notification-wrapper{
        --horiz-padding: .8em;
        --triangle-width: 15px;
        --triangle-height: 10px;
        --bg-color: #5855b7;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: .4em 0;
        padding: var(--horiz-padding);
        background: var(--bg-color);
        transform: translateX(var(--triangle-width));
        border-radius : 5px;
      }
      .notification-wrapper:before{
        content: "";
        display : inline-block;
        height : 0;
        width : 0;
        border-top : var(--triangle-height) solid transparent;
        border-right : var(--triangle-width) solid var(--bg-color);
        border-bottom : var(--triangle-height) solid transparent;
        position: absolute;
        left: 0;
        top: calc(50% - calc(var(--triangle-width) / 2));
        transform: translateX(calc(-50% - calc(var(--horiz-padding) / 2)));
      }
    `;
    this.shadowRoot.appendChild(style);
  }

  _newNotification(){
    const notification = document.createElement("DIV");
    notification.setAttribute("class", "notification-wrapper");
    notification.setAttribute("id", new Date().getTime());
    notification.appendChild(this.notificationHeader);
    notification.appendChild(this.notificationBody);
    this.shadowRoot.appendChild(notification)
  }

  get notificationHeader(){
    const title = document.createElement("h4");
    title.setAttribute("class", "notification-title");
    title.innerText = this.title;

    return title;
  }

  get notificationBody(){
    const message = document.createElement("DIV");
    message.setAttribute("class", "notification-message");
    message.innerText = this.message;

    return message;
  }

  /**
     * TODO unused
     * @param {string} name changed attribute name
     * @param {string} oldValue 
     * @param {string} newValue 
     */
  attributeChangedCallback(name, oldValue, newValue) {
    // TODO const field = this.wrapper.querySelector(".field-input");
      //TODO this.
  }

  disconnectedCallback(){
    this.textContent = "";
    this.remove();
  }

  connectedCallback(){
    this.render();
  }

  render(){
    this._addStyles();
    this._newNotification();
  }
}

customElements.define("notification-element", NotificationElement);