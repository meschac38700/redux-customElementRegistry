import {createStore} from "redux";
import { USER } from "./mutation-types.js";

const reducer = (state = [], action) => {
  if(action.type === USER.ADD_USER)
   return [...state, action.payload];
  return state;
};

export default createStore(reducer);