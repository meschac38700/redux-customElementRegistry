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
  console.log("clicked")
  const newUser = userStore.getState().user.newUser;
  if(!!newUser.name.length && !!newUser.description.length){
    UserActions.create(newUser);
    fields.forEach(field => field.setValue());
  }
});

const desc = `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`;

// Add Eliam user after 3seconds
window.setTimeout(() =>{
  fields[0].setValue(
    "Eliam LOTONGA", 
    ({name, value}) => UserActions.updateAttribute({fieldName:name, value: value})
  );
  fields[1].setValue(
    desc, 
    ({name, value}) => UserActions.updateAttribute({fieldName:name, value: value})
  );
  // wait 1s before submit the form
  new Promise(r => setTimeout(r, 1000)).then(() => addUserButton.click());

}, 2000);

fields.forEach(field => field.addEventListener("change", function (e) {
  e.preventDefault();
  e.stopPropagation();
  UserActions.updateAttribute({fieldName:field.name, value: field.value})
}));

app.prepend(...fields, addUserButton);