export default {
  ADD: (state, name) => {
    const nextID = (state.users.at(-1)?.id??0) + 1;
    return {...state, users: [ ...state.users, {id: nextID, name: name} ] };
  },
  DOM: (state, userId) => {
    // set dom attr to true
    const newUsers = state.users.map( user => user.id === userId ? {...user, dom:true}: {...user});
    if(newUsers){
      return {...state, users: newUsers };
    }
  }
}