// ChildSecond.js
import React, { useContext } from 'react';
import { Context } from './content';

export function ChildSecond() {
  const AppContext = useContext(Context);

  return <div>{AppContext.state.value + 's'}</div>;
}
