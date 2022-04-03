import store from "./index.js";
import ActionTypes from "./types.js";
export default {
  ADD_USER: (name) => {
    store.dispatch({type: ActionTypes.ADD_USER, payload: name});
  },
  USER_ADD_IN_DOM: (userID) => {
    store.dispatch({type: ActionTypes.SET_DOM, payload: userID});
  }
}