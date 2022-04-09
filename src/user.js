import UserActionTypes from "store/user/actionTypes";
import { subscribeUserStore } from "store/user";
import UserList from "components/user/UserList";
import UserActions from "store/user/actions";

const userList = new UserList();


subscribeUserStore(({lastAction, state}) => {
  const users = state.users;
  if(lastAction === UserActionTypes.ADD_USER && users.length){
    userList.push(...users);
  }
});

// Inject user list
document.getElementById("inject-user-list").appendChild(userList);

// Let"s add some users
UserActions.create({name: "Jack", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."});
UserActions.create({name: "Derick", description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."});