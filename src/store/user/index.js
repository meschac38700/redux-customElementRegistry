import {combineReducers, createStore} from "redux";
import globalReducer from "store/global/index";
import userState from "store/user/state";
import Mutations from "store/user/mutations";
import ActionTypes from "store/user/actionTypes";

function lastAction(state = null, action) {
  return action;
}

function reducer (state=userState, action) {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return Mutations.ADD(state, action.payload);
    case ActionTypes.SET_DOM:
      return Mutations.DOM(state, action.payload);
    default:
      return state;
  }
}
const userAndGlobalReducers = combineReducers({user:reducer, lastAction: globalReducer}) ;
export default createStore(userAndGlobalReducers);