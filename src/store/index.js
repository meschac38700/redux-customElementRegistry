import {createStore} from "redux";

const reducer = (state = { users: []}, action) => {
  /*if(action.type === USER.ADD_USER){
    const nextID = (state.users.at(-1)?.id??0) + 1;
    return {...state, users: [...state.users, {id: nextID, name: action.payload}]};
  }*/
  return state;
};

export default createStore(reducer);