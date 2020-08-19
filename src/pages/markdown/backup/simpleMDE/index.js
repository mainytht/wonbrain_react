import React, { useState, useRef, useEffect } from 'react';
import SimpleMDE from 'simplemde';
import sytle from './index.css';

export default () => {
  console.log(SimpleMDE);
  const [text, setText] = useState('# halalql');
  const mdRef = useRef();

  useEffect(() => {
    var simplemde = new SimpleMDE(mdRef.current);
    simplemde.value('# This text **will appear in the editor');
  }, []);
  return (
    <div>
      <h1>Page test</h1>
      <textarea ref={mdRef} onChange={e => setText(e.target.value)}>
        {text}
      </textarea>
    </div>
  );
};
