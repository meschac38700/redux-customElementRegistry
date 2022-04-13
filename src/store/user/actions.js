import store from "store/user";
import NotificationAction from "store/notification/actions";
import ActionTypes from "store/user/actionTypes";
import Notification from "models/Notification";

export default {
  /**
   * 
   * @param {Object} user {name: string, description: string}
   */
  create: ({name=null, description=null}) => {
    NotificationAction.addNotification(
     new Notification({title:"", message: `User <strong>${name}</strong> successfully added.` })
    );
    store.dispatch({type: ActionTypes.ADD_USER, payload: {name, description}});
  },
  /**
   * Update newUser attribute
   * @param {Object} param0 new attribute data
   */
  updateAttribute: ({fieldName="", value=""} = {}) => {
    if(fieldName.trim().length && value.trim().length){
      store.dispatch({type: ActionTypes.UPDATE_ATTR, payload: {fieldName, value}});
    }
  }
}