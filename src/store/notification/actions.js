import store from "store/notification";
import ActionTypes from "store/notification/actionTypes";

export default {
  /**
   * 
   * @param {Notification} notification
   */
  addNotification: (notification) => {
    store.dispatch({type: ActionTypes.ADD_NOTIFICATION, payload: notification});
    //delete after 3seconds;
    window.setTimeout(() =>{
      store.dispatch({type: ActionTypes.REMOVE_NOTIFICATION, payload: notification})
    }, 3000);
  },
}