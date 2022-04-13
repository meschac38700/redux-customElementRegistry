export default class NotificationElement extends HTMLElement {

  static get observedAttributes() {
    return ['title', 'message'];
  }

  #notification = null
  #observer = null;

  /**
   * @param {Notification} notification 
   */
  constructor(notification){
    super();
    this.attachShadow({mode:"open"});
    this.notification = notification;
  }


  get observerInstance(){
    return this.observer;
  }

  get getID(){
    return this.notification.id;
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
    if(this.notification.title?.length){
      notification.appendChild(this.notificationHeader);
    }
    notification.appendChild(this.notificationBody);
    this.shadowRoot.appendChild(notification)
  }

  get notificationHeader(){
    const title = document.createElement("h4");
    title.setAttribute("class", "notification-title");
    title.innerText = this.notification.title;

    return title;
  }

  get notificationBody(){
    const message = document.createElement("DIV");
    message.setAttribute("class", "notification-message");
    message.innerHTML = this.notification.message;

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

  /**
   * remove current element from DOM with animation
   * @param {number} duration of animation in milliseconds
   */
   smoothRemove(duration=500){
    this.classList.add("removing");
    window.setTimeout( () => {
      this.remove();
    }, duration);
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