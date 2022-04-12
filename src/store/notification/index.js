import {combineReducers, createStore} from "redux";
import ActionType from "store/notification/actionTypes";
import notifState from "store/notification/state";
import globalReducer from "store/global"

/**
 * default and global reducer
 */
export const notificationReducer = (state=notifState, action) => {
  if(action.type === ActionType.ADD_NOTIFICATION ){
    return {...state, notifications: [...state.notifications, action.payload]};
  }
  else if(action.type === ActionType.REMOVE_NOTIFICATION ){
    return {...state, notifications: state.notifications.filter(notif => notif.id !== action.payload.id)};
  }
  return state;
}

const reducers = combineReducers({notification: notificationReducer, lastAction: globalReducer})
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// const store = createStore(notificationReducer);

// add lastAction and check in notification lastAction to assign new value to notifications list or push element inside
export const subscribeNotificationStore = ( callBack => {
  store.subscribe( () => {
      callBack({
        notifications: store.getState().notification.notifications,
        lastAction:store.getState().lastAction
    });
  })
})

export default store;
