import React, { useContext, useEffect } from 'react';
import Context from '../Context';
import { request } from 'umi';

function Books() {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    request('/books').then((res) => {
      dispatch({ type: 'setBooks', books: res });
    });
  }, []);
  return (
    <div>
      <h1>我的书籍</h1>
      <ol>
        {state.books
          ? state.books.map((book) => <li key={book.id}>{book.name}</li>)
          : '加载中'}
      </ol>
    </div>
  );
}

export default Books;
