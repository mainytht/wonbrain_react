import React, { useReducer } from 'react';
import Context from '@/store/context/mdcontext.js';

import style from './index.css';
import Markdown from '@/components/markdown';
import mdReducer from '@/components/markdown/reducer.js';

const mdinit = {
  mdtext: '# 标题',
};

const obj = {
  ...mdReducer,
};

function reducer(state, action) {
  // fn是action对应的return语句（也是对象，也是函数）如果存在，那么就返回函数（参数是action和state)。
  const fn = obj[action.type];
  //上一行的意思是：根据actiontype， 返回action.type对应的函数/对象
  if (fn) {
    return fn(state, action);
    // 此函数没有名字，此处也只是用fn指向。
  } else {
    console.error('wrong type');
  }
}

function App() {
  const [mdstore, dispatch] = useReducer(reducer, mdinit);

  const api = { mdstore, dispatch };

  function handleClick() {
    var db;
    var request = indexedDB.open('library3');

    request.onupgradeneeded = function () {
      // 此数据库此前不存在，进行初始化
      var db = request.result;
      var store = db.createObjectStore('books3', { keyPath: 'isbn' });
      var titleIndex = store.createIndex('by_title', 'title', { unique: true });
      var authorIndex = store.createIndex('by_author', 'author');

      // 填入初始值
      store.put({ title: 'Quarry Memories', author: 'Fred', isbn: 123456 });
      store.put({ title: 'Water Buffaloes', author: 'Fred', isbn: 234567 });
      store.put({ title: 'Bedrock Nights', author: 'Barney', isbn: 345678 });
    };

    request.onsuccess = function () {
      db = request.result;
    };
  }
  return (
    <Context.Provider value={api}>
      <Markdown />
      <h1 onClick={handleClick}>{mdstore.mdtext}</h1>
    </Context.Provider>
  );
}

export default App;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

// 帮助函数
