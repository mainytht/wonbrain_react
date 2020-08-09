// Context.js
export const defaultState = {
  value: 0,
};

export function reducer(state, action) {
  switch (action.type) {
    case 'ADD_NUM':
      return { ...state, value: state.value + 1 };
    case 'REDUCE_NUM':
      return { ...state, value: state.value - 1 };
    default:
      throw new Error();
  }
}
