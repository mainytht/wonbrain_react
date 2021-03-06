import React, { useContext, useEffect } from 'react';
import Context from '../Context';
import { request } from 'umi';

function Movies() {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    request('/movies').then((res) => {
      dispatch({ type: 'setMovies', movies: res });
      // 分发一个 action , payload 名字为 movies（其实也可也是别的额）值为request的返回
    });
  }, []);
  return (
    <div>
      <h1>我的电影</h1>
      <ol>
        {state.movies
          ? state.movies.map((movie) => <li key={movie.id}>{movie.name}</li>)
          : '加载中'}
      </ol>
    </div>
  );
}
export default Movies;
