export default {
  /**
   * Insert new user
   * @param {Object} state user state
   * @param {number} id new user'ID
   * @returns {Object} new state
   */
  ADD: (state, newUser) => {
    const users = [ ...(state.users??[])];
    const nextID = (users.at(-1)?.id??0) + 1;
    return {...state, users: [ ...users, {...newUser, id: nextID } ], newUser: {} };
  },
  /**
   * Update current creating user attribute
   * @param {Object} state user state
   * @param {Object} param1 user new attribute
   * @returns 
   */
  UPDATE_ATTR: (state, {fieldName=null, value=null}={}) => {
    if(!fieldName || !value)
      return state;

    const newUserAttribute = {};
    newUserAttribute[`${fieldName}`] = value;

    return {...state, newUser: {...state.newUser, ...newUserAttribute}};
  }
}