import store from "store/user";
import ActionTypes from "store/user/actionTypes";
export default {
  /**
   * 
   * @param {Object} user {name: string, description: string}
   */
  ADD_USER: (user) => {
    store.dispatch({type: ActionTypes.ADD_USER, payload: user});
  },
  USER_ADD_IN_DOM: (userID) => {
    store.dispatch({type: ActionTypes.SET_DOM, payload: userID});
  }
}