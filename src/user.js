import UserActions from "store/user/actions.js";
import store from "store/user/index.js";
import UserActionTypes from "store/user/actionTypes";

const userInput = document.querySelector(".user-input");
const submitButton = document.querySelector(".user-button");


submitButton.addEventListener("click", () => {
  const name = userInput.value.trim();
  if(name !== ""){
    UserActions.ADD_USER(name);
  }
});

// Subscribe to the user store
store.subscribe(() => {
  // not re-render the all list but render the only new added user (update dom)
  const userNotInDomYet = store.getState().user.users.filter(user => !user.dom);
  const lastAction = store.getState().lastAction;
  if(lastAction === UserActionTypes.ADD_USER && userNotInDomYet.length){
    updateAddUserDOM(userNotInDomYet);
  }
});


function updateAddUserDOM(users){
  const userListDOM = document.querySelector(".user-list");
  users.forEach( user => {
    if(!user.dom){
      const li = document.createElement("LI");
      li.setAttribute("class", "user-item");
      li.setAttribute("id", `user-${user.id}`);
      li.setAttribute("key", `user-${user.id}`);
      li.innerText = user.name;
      userListDOM.appendChild(li);
      UserActions.USER_ADD_IN_DOM(user.id);
    }
  })
  // patch dom not all users

}



// Let"s add some users
UserActions.ADD_USER("Jack");
UserActions.ADD_USER("Derick");