import UserActions from "store/user/actions.js";
import store from "store/user/index.js";
import UserActionTypes from "store/user/actionTypes";
import UserItem from "components/user/UserItem";

const userInput = document.getElementById("user-input");
const userDescription = document.getElementById("user-description");
const submitButton = document.getElementById("user-button");


submitButton.addEventListener("click", () => {
  const name = userInput.value.trim();
  const description = userDescription.value.trim();
  if(!!name.length && !!description.length){
    UserActions.ADD_USER({name, description});
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
      userListDOM.appendChild(new UserItem(`${user.name}-${user.id}`, user))
      UserActions.USER_ADD_IN_DOM(user.id);
    }
  })
  // patch dom not all users

}



// Let"s add some users
UserActions.ADD_USER({name: "Jack", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."});
UserActions.ADD_USER({name:"Derick", description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."});