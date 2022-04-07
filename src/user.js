import UserActions from "store/user/actions";
import userStore from "store/user";
import UserActionTypes from "store/user/actionTypes";
import UserList from "components/user/UserList";

const userInput = document.getElementById("user-input");
const userDescription = document.getElementById("user-description");
const submitButton = document.getElementById("user-button");
const userList = new UserList();

submitButton.addEventListener("click", () => {
  const name = userInput.value.trim();
  const description = userDescription.value.trim();
  if(!!name.length && !!description.length){
    UserActions.create({name, description});
  }
});

userStore.subscribe(() => {
  const users = userStore.getState().user.users;
  const lastAction = userStore.getState().lastAction;

  if(lastAction === UserActionTypes.ADD_USER && users.length){
    userList.push(...users);
  }
});

// Inject user list
document.getElementById("inject-user-list").appendChild(userList);

// Let"s add some users
UserActions.create({name: "Jack", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."});
UserActions.create({name: "Derick", description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."});