import userStore from "store/user";
import UserActions from "store/user/actions";
import SubmitField from "components/form/SubmitField";
import InputField from "components/form/InputField";
import TextareaField from "components/form/TextareaField";


const app = document.getElementById("app");
const fields = [
  new InputField({
    name: "name",
    id:"user-name", 
    placeholder:"Enter user'name", 
    value: userStore.getState().user.newUser.name ?? "",
    label:"Name"
  }), 
  new TextareaField({
    name: "description",
    id:"user-description", 
    placeholder:"Enter user'description", 
    value: userStore.getState().user.newUser.description ?? "",
    label:"Description"
  })
];
const addUserButton = new SubmitField({label: "Add user"});
addUserButton.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const newUser = userStore.getState().user.newUser;
  if(!!newUser.name.length && !!newUser.description.length){
    UserActions.create(newUser);
    fields.forEach(field => field.resetValue());
  }
  
})

fields.forEach(field => field.addEventListener("change", function (e) {
  e.preventDefault();
  e.stopPropagation();
  UserActions.updateAttribute({fieldName:field.name, value: field.value})
}));

app.prepend(...fields, addUserButton);