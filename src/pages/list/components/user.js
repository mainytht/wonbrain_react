import React, { useContext, useEffect } from 'react';
import Context from '../Context';
import { request } from 'umi';

function User() {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    request('/user').then(res => {
      dispatch({ type: 'setUser', user: res });
    });
  }, []);
  return (
    <div>
      <h1>个人信息</h1>
      <div>名字: {state.user ? state.user.name : ''}</div>
    </div>
  );
}

export default User;
