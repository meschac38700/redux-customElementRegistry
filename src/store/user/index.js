import {createStore} from "redux";
import userState from "./state.js";
import Mutations from "./mutations.js";
import ActionTypes from "./types.js";

const reducer = (state=userState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return Mutations.ADD(state, action.payload);
    case ActionTypes.SET_DOM:
      return Mutations.DOM(state, action.payload);
  }
}

export default createStore(reducer);