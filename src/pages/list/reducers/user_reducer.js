export default {
  setUser: (state, action) => {
    console.log(state);
    console.log(action);
    return { ...state, user: action.user };
    // state 中合并加入 新的user 参数；
  },
  removeUser: () => {},
};
