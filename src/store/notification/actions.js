import store from "store/notification";
import ActionTypes from "store/notification/actionTypes";
import Notification from "models/Notification";

export default {
  /**
   * 
   * @param {Object} user {name: string, description: string}
   */
  addNotification: ({title=null, message=null}) => {
    const newNotif = new Notification({title, message});
    store.dispatch({type: ActionTypes.ADD_NOTIFICATION, payload: newNotif});
    //delete after 3seconds;
    window.setTimeout(() =>{
      store.dispatch({type: ActionTypes.REMOVE_NOTIFICATION, payload: newNotif})
    }, 3000);
  },
}