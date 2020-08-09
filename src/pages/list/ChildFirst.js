// ChildFirst.js
import React, { useContext } from 'react';
import { Context } from './content';

export function ChildFirst() {
  const AppContext = useContext(Context);

  return (
    <div>
      <button
        onClick={() => {
          AppContext.dispatch({
            type: 'ADD_NUM',
            payload: {},
          });
        }}
      >
        addNum
      </button>
      <button
        onClick={() => {
          AppContext.dispatch({
            type: 'REDUCE_NUM',
            payload: {},
          });
        }}
      >
        reduceNum
      </button>
    </div>
  );
}
