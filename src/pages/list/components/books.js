import React, { useContext, useEffect } from 'react';
import Context from '../Context';
import ajax from '../ajax';

function Books() {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    ajax('/books').then(res => {
      console.log('111');
      dispatch({ type: 'setBooks', books: res });
    });
  }, []);
  return (
    <div>
      <h1>我的书籍</h1>
      <ol>
        {state.books
          ? state.books.map(book => <li key={book.id}>{book.name}</li>)
          : '加载中'}
      </ol>
    </div>
  );
}

export default Books;
