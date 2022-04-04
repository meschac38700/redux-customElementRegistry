export default {
  /**
   * 
   * @param {Object} state users
   * @param {Object} user {name: string, description: string}
   * @returns {Object} new state
   */
  ADD: (state, user) => {
    const users = [ ...(state.users??[])];
    const nextID = (users.at(-1)?.id??0) + 1;

    return {...state, users: [ ...users, {id: nextID, ...user } ] };
  },
  DOM: (state, userId) => {
    // set dom attr to true
    const newUsers = state.users.map( user => user.id === userId ? {...user, dom:true}: {...user});
    if(newUsers){
      return {...state, users: newUsers };
    }
  }
}