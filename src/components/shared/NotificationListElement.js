import NotificationElement from "components/shared/NotificationElement";
import { subscribeNotificationStore } from "store/notification";
import ActionTypes from "store/notification/actionTypes";


export default class NotificationListElement extends HTMLElement {

  #notifications = null;
  #notificationsDOM = null
  #notificationObserver = null;

  constructor(){
    super();

    this.notifications = [];
    this.notificationsDOM = [];
    this.container = document.createElement("DIV");
    this.container.setAttribute("class", "container");
    // this.__setNotifications(notifications);
    this.__initNotificationObserver();
  }


  get getNotifications (){
    return this.notifications;
  }


  __addStyles(){
    const style = document.createElement("STYLE");
    style.textContent = `
      notification-list:defined{
        position: absolute;
        right: 0;
        transform: translateX(100%);
      }
      notification-list:defined .container{
        adding: .8em;
        display: flex;
        flex-direction: column;
        gap: 1em 0;
        height: 400px;
      }
    `;
    this.appendChild(style);
  }

  __initNotificationObserver(){
    this.notificationObserver = new Proxy(this.getNotifications, {
      /**
       * 
       * @param {NotificationListElement} self 
       * @param {number} index new index in the notifications list
       * @param {Notification} value notification object
       */
      set: (self, index, value) => {
        if(!isNaN(index)){
          self[index] = value;
          const newNotif = new NotificationElement(value);
          this.notificationsDOM.push(newNotif); // TODO proxy
          this.container.appendChild(newNotif);
        }
        return true;
      },
      get(self, attribute){
        return self[attribute];
      }
    })
  }

  /**
   * Append new notification
   * @param {Notification} notification instance of Notification
   */
  appendNotification(notification){
    const alreadyExists  = this.notifications.find(notif => notif.id === notification.id) ?? false;

    if(!alreadyExists){
      this.notificationObserver.push(notification);
    }
  }


  /**
   * append many notifications
   * @param {Array<Notification>} notificationList list of Notification instances
   */
  appendNotifications(notificationList){
    const currentNotificationIDs = this.notifications.map(notif => notif.id);
    const newNotifications = notificationList.filter(notif => !currentNotificationIDs.includes(notif.id));
    newNotifications.forEach(notif => this.appendNotification(notif));
  }

  removeNotifications(notificationsList){
    const keepedNotifIDs = notificationsList.map(notif => notif.id);
    this.notificationsDOM.forEach(notif => {
      if(!keepedNotifIDs.includes(notif.getID)){
        notif.remove();
      }
    });

    this.notificationObserver = [...notificationsList]
  }

  connectedCallback(){
    this.render();
  }

  render(){
    this.__addStyles();
    subscribeNotificationStore( ({notifications, lastAction}) => {
      if(lastAction === ActionTypes.REMOVE_NOTIFICATION){
        this.removeNotifications(notifications);
        return;
      }
      this.appendNotifications(notifications);
    })
    this.appendChild(this.container);
  }
}

customElements.define("notification-list", NotificationListElement);