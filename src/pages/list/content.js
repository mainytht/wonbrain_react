import React, { useReducer, createContext } from 'react';
import { ChildFirst } from './ChildFirst';
import { ChildSecond } from './ChildSecond';
import { reducer, defaultState } from './context';

export const Context = createContext(null);

export default function Content() {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <Context.Provider value={{ state, dispatch: dispatch }}>
      <ChildFirst />
      <ChildSecond />
    </Context.Provider>
  );
}
