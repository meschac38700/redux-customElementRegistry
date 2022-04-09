import {combineReducers, createStore} from "redux";
import ActionTypes from "store/user/actionTypes";
import globalReducer from "store/global/index";
import Mutations from "store/user/mutations";
import userState from "store/user/state";

function reducer (state=userState, action) {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return Mutations.ADD(state, action.payload);
    case ActionTypes.UPDATE_ATTR:
      return Mutations.UPDATE_ATTR(state, action.payload);
    default:
      return state;
  }
}
const userAndGlobalReducers = combineReducers({user:reducer, lastAction: globalReducer}) ;
const store = createStore(
  userAndGlobalReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



export const subscribeUserStore = ( callBack => {
  store.subscribe( () => {
    callBack({lastAction: store.getState().lastAction, state: store.getState().user});
  })
})

export default store;