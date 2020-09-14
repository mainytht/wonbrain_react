export default {
  setBooks: (state, action) => {
    console.log(state);
    console.log(action);

    return { ...state, books: action.books };
  },
  deleteBook: () => {},
};
