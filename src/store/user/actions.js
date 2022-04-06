import store from "store/user";
import ActionTypes from "store/user/actionTypes";
export default {
  /**
   * 
   * @param {Object} user {name: string, description: string}
   */
  create: (user) => {
    store.dispatch({type: ActionTypes.ADD_USER, payload: user});
  },
}