import NotificationElement from "components/shared/NotificationElement";
import { subscribeNotificationStore } from "store/notification";
import ActionTypes from "store/notification/actionTypes";


export default class NotificationListElement extends HTMLElement {

  #notifications = null;
  #notificationsDOM = null
  #notificationObserver = null;
  #notificationDOMObserver = null;

  constructor(){
    super();

    this.notifications = [];
    this.notificationsDOM = [];
    this.container = document.createElement("DIV");
    this.container.setAttribute("class", "container");
    this.__initNotificationObserver();
    this.__initNotificationDOMObserver();
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
        align-items: flex-start;
        gap: 1em 0;
      }
      notification-element{
        opacity: 1;
        transition: opacity .3s ease-in-out, transform .5s ease-in-out;
      }
      .removing{
        transform: translateX(-200%);
        opacity: 0;
      }
    `;
    this.appendChild(style);
  }

  __initNotificationObserver(data=null){
    this.notifications = data??[];
    this.notificationObserver = new Proxy(this.notifications, {
      /**
       * 
       * @param {NotificationListElement} self 
       * @param {number} index new index in the notifications list
       * @param {Notification} notification instance
       */
      set: (self, index, notification) => {
        if(!isNaN(index)){
          self[index] = notification;
          this.notificationDOMObserver.push(new NotificationElement(notification));
        }
        return true;
      },
      get(self, index){
        return self[index];
      }
    })
  }

  __initNotificationDOMObserver(data=null){
    this.notificationsDOM = data ?? [];
    this.notificationDOMObserver = new Proxy(this.notificationsDOM, {
      /**
       * 
       * @param {NotificationListElement} self 
       * @param {number} index new index in the notifications list
       * @param {NotificationElement} value
       */
      set: (self, index, notificationElement) => {
        if(!isNaN(index)){
          self[index] = notificationElement;
          this.container.appendChild(notificationElement);
        }
        return true;
      },
      get: (self, index) => {
        return self[index];
      }
    });
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
    const notificationIDsToKeep = notificationsList.map(notif => notif.id);
    this.notificationsDOM.forEach(notif => {
      if(!notificationIDsToKeep.includes(notif.getID)){
        notif.smoothRemove(500);
      }
    });

    this.__initNotificationObserver([...notificationsList]);
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