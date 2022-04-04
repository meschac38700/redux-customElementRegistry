export default {
  ADD: (state, name) => {
    const users = [ ...(state.users??[])];
    const nextID = (users.at(-1)?.id??0) + 1;

    return {...state, users: [ ...users, {id: nextID, name: name} ] };
  },
  DOM: (state, userId) => {
    // set dom attr to true
    const newUsers = state.users.map( user => user.id === userId ? {...user, dom:true}: {...user});
    if(newUsers){
      return {...state, users: newUsers };
    }
  }
}