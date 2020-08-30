import React, { useRef, useEffect, useState } from 'react';

import { Button, Row, Col } from 'antd';

// window.onCopy=e => console.log(e.clipboardData.getData('Text'))

export default function index(params) {
  const textref = useRef(0);
  useEffect(() => {
    console.log('useEffect');
  }, []);
  return (
    <div>
      <button
        onClick={e => {
          let str = 'https://sss.png';
          console.log(str.match('^http(s)?\\:\\/\\/(\\S)*\\.(jpg|gif|png)$'));
        }}
      >
        click
      </button>
      {/* <textarea onPaste={(e)=>console.log(e.clipboardData.getData('Text'))}>aaaaa</textarea> */}
      {/* <textarea ref ={textref} onClick={()=>console.log('clicked')} onPaste={e => console.log(e.clipboardData.getData('Text'))}>
        aaaaabbbbb
      </textarea> */}
    </div>
  );
}
