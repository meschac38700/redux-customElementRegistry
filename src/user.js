import UserActions from "store/user/actions";

/**
 * Add default users
 * @param {Array<InputField>} fields list of fields
 * @param {SubmitField} submitBtn subimit button
 */
export const autoAddUsers = ({fields, submitBtn} = {} ) => {
  // Let"s add some users
  const defaultUsers = [
    {name: "Jack", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
    {name: "Derick", description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."},
    {name: "Eliam LOTONGA", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",}
  ]

  const int = window.setInterval(() => {
    const user = defaultUsers.shift();

    fields.forEach((field) => {
      field.setValue(
        user[field.observerInstance.name],
        ({name, value}) => UserActions.updateAttribute({fieldName:name, value: value})
      )
    });
    // wait 1s before submit the form
    new Promise(r => setTimeout(r, 500)).then(() => submitBtn.click());

    if(!defaultUsers.length)
      clearInterval(int);
  }, 1000);
};