export default {
  setMovies: (state, action) => {
    console.log(state);
    console.log(action);
    return { ...state, movies: action.movies };
  },
  deleteMovies: () => {},
};
