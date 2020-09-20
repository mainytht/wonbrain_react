export default {
  setMdtext: (state, action) => {
    console.log(state);
    console.log(action);

    return { ...state, mdtext: action.mdtext };
  },
  setMd: (state, action) => {
    console.log(state);
    console.log(action);

    return { ...state, ...action };
  },
  deleteMarkdown: () => {},
};
