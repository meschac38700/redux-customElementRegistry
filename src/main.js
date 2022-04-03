import store from "./store/index.js";
import {USER} from "./store/mutation-types.js";

console.log(store);
// module 1
store.subscribe(() => {
  console.log("Subscriber", store.getState());
});

// module 2

store.dispatch({ type: USER.ADD_USER, payload: {id: 1, name: "Jack"} });
store.dispatch({ type: USER.ADD_USER, payload: {id: 2, name: "Derick"} });