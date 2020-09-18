export default {
  setMdtext: (state, action) => {
    console.log(state);
    console.log(action);

    return { ...state, mdtext: action.mdtext };
  },
  setMdid: (state, action) => {
    console.log(state);
    console.log(action);

    return { ...state, mdid: action.mdid };
  },
  deleteMarkdown: () => {},
};
