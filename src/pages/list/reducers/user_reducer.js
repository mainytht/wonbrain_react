export default {
  setUser: (state, action) => {
    console.log(state);
    console.log(action);
    return { ...state, user: action.user };
  },
  removeUser: () => {},
};
