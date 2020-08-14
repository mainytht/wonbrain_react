import React, { useReducer } from 'react';
import User from './components/user';
import Context from './Context';
import Books from './components/books';
import Movies from './components/movies';
import userReducer from './reducers/user_reducer';
import booksReducer from './reducers/books_reducer';
import moviesReducer from './reducers/movies_reducer';
import style from './index.css';

const store = {
  user: null,
  books: null,
  movies: null,
};

const obj = {
  ...userReducer,
  ...booksReducer,
  ...moviesReducer,
};

function reducer(state, action) {
  // fn是action对应的return语句（也是对象，也是函数）如果存在，那么就返回函数（参数是action和state)。
  const fn = obj[action.type];
  if (fn) {
    return fn(state, action);
    // 此函数没有名字，此处也只是用fn指向。
  } else {
    console.error('wrong type');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, store);

  const api = { state, dispatch };
  console.log('reducer combined to:');
  console.log(obj);
  return (
    <Context.Provider value={api}>
      <h1 className={style.title}>
        利用 useRecuce useContext 模拟 redux ，利用 自带mock
      </h1>
      <User />
      <hr />
      <Books />
      <Movies />
    </Context.Provider>
  );
}

export default App;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

// 帮助函数
